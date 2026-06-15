const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
};

// Helper for authenticated requests
const fetchWithAuth = async (url, options = {}) => {
    let token = localStorage.getItem('hr_token');
    const headers = {
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData, browser will do it with boundary
    if (options.body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    console.log(`[API Request] Fetching: ${url}`);
    let response;
    try {
        response = await fetch(`${API_BASE}${url}`, {
            ...options,
            headers,
        });
    } catch (fetchErr) {
        console.error(`[API Network Error] ${url}:`, fetchErr);
        throw new Error('Network error. Please check your connection.');
    }

    // Handle token expiration
    if (response.status === 401 && !options._retry) {
        console.warn(`[API 401 Unauthorized] ${url} returned 401. Checking for token expiration...`);
        const clone = response.clone();
        try {
            const errData = await clone.json();
            console.log(`[API 401 Error Data]`, errData);
            if (errData.code === 'TOKEN_EXPIRED') {
                console.log(`[API Auth] Access token expired. Attempting token refresh...`);
                const refreshToken = localStorage.getItem('hr_refresh_token');
                if (refreshToken) {
                    if (!isRefreshing) {
                        isRefreshing = true;
                        try {
                            console.log(`[API Auth] Requesting new access token via /auth/refresh...`);
                            const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ refreshToken }),
                            });

                            if (refreshResponse.ok) {
                                const refreshData = await refreshResponse.json();
                                const newAccessToken = refreshData.accessToken;
                                console.log(`[API Auth] Token refresh successful! Storing new token.`);
                                localStorage.setItem('hr_token', newAccessToken);
                                isRefreshing = false;
                                onRefreshed(newAccessToken);
                            } else {
                                console.error(`[API Auth] Token refresh failed with status ${refreshResponse.status}.`);
                                isRefreshing = false;
                                localStorage.removeItem('hr_token');
                                localStorage.removeItem('hr_refresh_token');
                                window.dispatchEvent(new Event('auth-logout'));
                                throw new Error('Session expired');
                            }
                        } catch (err) {
                            console.error(`[API Auth] Exception during token refresh:`, err);
                            isRefreshing = false;
                            localStorage.removeItem('hr_token');
                            localStorage.removeItem('hr_refresh_token');
                            window.dispatchEvent(new Event('auth-logout'));
                            throw err;
                        }
                    }

                    console.log(`[API Auth] Queuing request ${url} until token refresh completes.`);
                    return new Promise((resolve) => {
                        subscribeTokenRefresh((newToken) => {
                            options.headers = {
                                ...options.headers,
                                'Authorization': `Bearer ${newToken}`,
                            };
                            options._retry = true;
                            console.log(`[API Auth] Retrying queued request: ${url}`);
                            resolve(fetchWithAuth(url, options));
                        });
                    });
                } else {
                    console.warn(`[API Auth] 401 code is TOKEN_EXPIRED but no hr_refresh_token found in localStorage.`);
                }
            }
        } catch (e) {
            console.error(`[API Auth] Failed to check for token expiration:`, e);
        }
    }

    let data;
    try {
        data = await response.json();
    } catch (parseErr) {
        console.error(`[API JSON Parse Error] Failed to parse response from ${url}:`, parseErr);
        throw new Error(response.statusText || 'Failed to parse server response');
    }

    if (!response.ok) {
        console.error(`[API Error Response] ${url} returned status ${response.status}:`, data);
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};

// ---- Auth Service ----
export const authService = {
    async login(email, password) {
        console.log(`[Auth Service] Logging in user: ${email}`);
        const data = await fetchWithAuth('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        return data; // returns { success, user, accessToken, refreshToken }
    },

    async register(userData) {
        console.log(`[Auth Service] Registering user: ${userData.email}`);
        const data = await fetchWithAuth('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        return data;
    },

    async refresh(refreshToken) {
        console.log(`[Auth Service] Requesting manual token refresh`);
        const response = await fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to refresh token');
        }
        return data;
    },

    async getProfile() {
        const data = await fetchWithAuth('/auth/profile');
        return data.user;
    },

    async updateProfile(userData) {
        const data = await fetchWithAuth('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
        return data.user;
    },

    async forgotPassword(email) {
        const data = await fetchWithAuth('/auth/forgotpassword', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
        return data;
    },

    async resetPassword(token, password) {
        const data = await fetchWithAuth(`/auth/resetpassword/${token}`, {
            method: 'PUT',
            body: JSON.stringify({ password }),
        });
        return data;
    },
};

// ---- Complaint Service ----
export const complaintService = {
    async getAll(filters = {}) {
        const params = new URLSearchParams();
        if (filters.status && filters.status !== 'all') params.append('status', filters.status);
        if (filters.category && filters.category !== 'all') params.append('category', filters.category);
        if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority);
        if (filters.search) params.append('search', filters.search);
        if (filters.myComplaints) params.append('myComplaints', 'true');

        const data = await fetchWithAuth(`/complaints?${params.toString()}`);

        // Transform backend data to match frontend expectations if necessary
        // Backend returns _id, frontend expects id
        return data.data.map(c => ({
            ...c,
            id: c._id // Mapping MongoDB _id to id for frontend
        }));
    },

    async getById(id) {
        const data = await fetchWithAuth(`/complaints/${id}`);
        const complaint = data.data;
        return {
            ...complaint,
            id: complaint._id,
            comments: complaint.comments.map(c => ({
                ...c,
                id: c._id
            }))
        };
    },

    async create(formData) {
        const data = await fetchWithAuth('/complaints', {
            method: 'POST',
            body: formData, // This is FormData with images
        });
        return data.data;
    },

    async update(id, updateData) {
        const body = updateData instanceof FormData ? updateData : JSON.stringify(updateData);
        const data = await fetchWithAuth(`/complaints/${id}`, {
            method: 'PUT',
            body: body,
        });
        return data.data;
    },

    async addComment(id, text) {
        const data = await fetchWithAuth(`/complaints/${id}/comments`, {
            method: 'POST',
            body: JSON.stringify({ text }),
        });
        const comment = data.data;
        return {
            ...comment,
            id: comment._id
        };
    },

    async upvote(id) {
        const data = await fetchWithAuth(`/complaints/${id}/upvote`, {
            method: 'POST',
        });
        return data;
    },

    async delete(id) {
        const data = await fetchWithAuth(`/complaints/${id}`, {
            method: 'DELETE',
        });
        return data;
    },

    async getStats() {
        const data = await fetchWithAuth('/complaints/stats');
        return data.data;
    },

    async submitFeedback(id, feedback) {
        const data = await fetchWithAuth(`/complaints/${id}/feedback`, {
            method: 'POST',
            body: JSON.stringify(feedback),
        });
        return data.data;
    },

    async reopen(id) {
        const data = await fetchWithAuth(`/complaints/${id}/reopen`, {
            method: 'POST',
        });
        return data.data;
    },

    // Comment CRUD operations
    async editComment(id, commentId, text) {
        const data = await fetchWithAuth(`/complaints/${id}/comments/${commentId}`, {
            method: 'PUT',
            body: JSON.stringify({ text }),
        });
        const comment = data.data;
        return {
            ...comment,
            id: comment._id
        };
    },

    async deleteComment(id, commentId) {
        const data = await fetchWithAuth(`/complaints/${id}/comments/${commentId}`, {
            method: 'DELETE',
        });
        return data.data;
    },
};

// ---- Categories & Constants ----
export const CATEGORIES = [
    'Plumbing',
    'Electrical',
    'Internet',
    'Infrastructure',
    'Mess',
    'Cleaning',
    'Security',
    'Other',
];

export const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

export const STATUSES = ['Pending', 'In Progress', 'Resolved', 'Rejected'];

export const HOSTELS = [
    'Hostel A',
    'Hostel B',
    'Hostel C',
    'Hostel D',
    'Girls Hostel 1',
    'Girls Hostel 2',
];

export const announcementService = {
    getAll: async () => {
        const data = await fetchWithAuth('/announcements');
        return data.data;
    },
    create: async (formData) => {
        const data = await fetchWithAuth('/announcements', {
            method: 'POST',
            body: formData,
        });
        return data.data;
    },
    delete: async (id) => {
        const data = await fetchWithAuth(`/announcements/${id}`, {
            method: 'DELETE',
        });
        return data;
    },
};
