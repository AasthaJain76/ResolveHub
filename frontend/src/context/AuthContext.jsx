import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('hr_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            console.log('[AuthContext] Token found in localStorage. Loading user profile...');
            loadUser();
        } else {
            console.log('[AuthContext] No token found in localStorage.');
            setLoading(false);
        }

        const handleLogout = () => {
            console.warn('[AuthContext] Received auth-logout event. Logging out user.');
            logout();
        };
        window.addEventListener('auth-logout', handleLogout);
        return () => {
            window.removeEventListener('auth-logout', handleLogout);
        };
    }, []);

    const loadUser = async () => {
        try {
            const userData = await authService.getProfile();
            setUser(userData);
        } catch (err) {
            console.error('Failed to load user:', err);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        console.log('[AuthContext] login function triggered');
        const { user: userData, accessToken, refreshToken } = await authService.login(email, password);
        console.log('[AuthContext] login success. Saving tokens.');
        localStorage.setItem('hr_token', accessToken);
        localStorage.setItem('hr_refresh_token', refreshToken);
        setToken(accessToken);
        setUser(userData);
        return userData;
    };

    const register = async (userData) => {
        console.log('[AuthContext] register function triggered');
        const { user: newUser, accessToken, refreshToken } = await authService.register(userData);
        console.log('[AuthContext] register success. Saving tokens.');
        localStorage.setItem('hr_token', accessToken);
        localStorage.setItem('hr_refresh_token', refreshToken);
        setToken(accessToken);
        setUser(newUser);
        return newUser;
    };

    const logout = () => {
        console.log('[AuthContext] logging out. Clearing tokens.');
        localStorage.removeItem('hr_token');
        localStorage.removeItem('hr_refresh_token');
        setToken(null);
        setUser(null);
    };

    const updateUser = (data) => {
        setUser(prev => ({ ...prev, ...data }));
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


