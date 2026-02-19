import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://desktop-sgloo1r.tail972c67.ts.net/api/v1';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '5f3678a3-4f5e-6d7e-8f9a-1b2c3d4e5f6g'; // Default for now if .env fails

export async function apiRequest(endpoint: string, options: any = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    const headers: Record<string, string> = {
        'API-key': API_KEY,
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await axios({
            url: `${BASE_URL}/${endpoint}`,
            method: options.method || 'GET',
            data: options.body ? JSON.parse(options.body) : undefined,
            // headers,
            withCredentials: true,
            ...options,
        });

        return response.data;
    } catch (error: any) {
        if (error.response) {
            const errorData = error.response.data;
            throw new Error(errorData.message || `API Request failed with status ${error.response.status}`);
        }
        throw new Error(error.message || 'API Request failed');
    }
}
