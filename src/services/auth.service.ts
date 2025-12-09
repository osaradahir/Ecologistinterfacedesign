import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse, Usuario } from '../types';

export const authService = {
    async register(data: RegisterRequest): Promise<Usuario> {
        const response = await api.post<Usuario>('/auth/register', data);
        return response.data;
    },

    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);
        const { access_token, user } = response.data;

        // Guardar token y usuario en localStorage
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        return response.data;
    },

    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    },

    getToken(): string | null {
        return localStorage.getItem('access_token');
    },

    getCurrentUser(): Usuario | null {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },

    async me(): Promise<Usuario> {
        const response = await api.get<Usuario>('/auth/me');
        return response.data;
    }
};
