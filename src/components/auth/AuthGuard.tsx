"use client";
import { useStore } from "@/store/useStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import Cookies from "js-cookie";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, fetchCurrentUser, clearAuth } = useStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            // Since access_token might be HttpOnly, we can't reliably check document.cookie
            // Instead, we try to fetch the current user. If it fails, we assume unauthenticated.

            if (!isAuthenticated) {
                try {
                    await fetchCurrentUser();
                } catch (error) {
                    // Only redirect if we are not already on a public page
                    if (pathname !== '/signin' && pathname !== '/signup') {
                        router.push('/signin');
                    }
                    setIsLoading(false);
                    return;
                }
            }

            // Re-check state after fetch
            const state = useStore.getState();
            const user = state.user;

            if (!state.isAuthenticated && pathname !== '/signin' && pathname !== '/signup') {
                router.push('/signin');
                setIsLoading(false);
                return;
            }

            if (user) {
                const role = user.role?.name;

                if (pathname.startsWith('/system') && role !== 'system_administrator') {
                    router.push('/signin'); // Or redirect to their dashboard
                    return;
                }

                if (pathname.startsWith('/super') && role !== 'superuser') {
                    router.push('/signin');
                    return;
                }
            }

            setIsLoading(false);
        };

        checkAuth();
    }, [isAuthenticated, pathname, router, fetchCurrentUser, clearAuth]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
        );
    }

    return <>{children}</>;
}
