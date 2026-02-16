
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://desktop-sgloo1r.tail972c67.ts.net/api/v1';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '5f3678a3-4f5e-6d7e-8f9a-1b2c3d4e5f6g'; // Default for now if .env fails

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    const headers = new Headers(options.headers);
    headers.set('API-key', API_KEY);
    headers.set('Content-Type', 'application/json');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
        return {};
    }

    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch (e) {
        // If content is not JSON (but not empty either), return as is or handle appropriately
        // For now, logging and returning empty object or raw text might be safer depending on use case.
        // Assuming API always returns JSON except for 204.
        console.warn("Failed to parse response as JSON:", text);
        return {}
    }
}
