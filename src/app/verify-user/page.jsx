'use client'
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import Loading from '@/components/loading/Loading';

const VerifyUserContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                if (typeof window === 'undefined') return;

                // Get locale from URL pathname or use default
                const pathname = window.location.pathname;
                const pathSegments = pathname.split('/').filter(Boolean);
                const supportedLocales = ['en', 'fr', 'de', 'es', 'bn', 'hi', 'ja', 'ko', 'it', 'pt', 'ru', 'ta', 'ml', 'ar'];
                const locale = pathSegments[0] && supportedLocales.includes(pathSegments[0]) ? pathSegments[0] : 'en';

                // Get token from URL params (backend will redirect here with token)
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token') || searchParams?.get('token');
                
                if (!token) {
                    setError('No token provided');
                    setLoading(false);
                    setTimeout(() => {
                        router.push(`/${locale}/login`);
                    }, 2000);
                    return;
                }

                // Verify token with API - pass token as path parameter
                const response = await api.get(`/auth/verify-user/${token}`);

                if (response.data) {
                    const userData = response.data.user || response.data;
                    
                    // Validate that we have user data
                    if (!userData) {
                        throw new Error('No user data received from server');
                    }
                    
                    // Store token and user data
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userName', userData.name || userData.displayName || userData.userName || '');
                    localStorage.setItem('userImage', userData.photoUrl || userData.image || userData.photoURL || userData.avatar || '');
                    localStorage.setItem('logged_in_user', JSON.stringify(userData));

                    // Check if there's a redirect param or upload param from the original login
                    const redirect = urlParams.get('redirect') || searchParams?.get('redirect') || `/${locale}`;
                    const uploadCheck = urlParams.get('upload') === 'true' || searchParams?.get('upload') === 'true';
                    
                    // Redirect to appropriate page
                    setLoading(false);
                    if (uploadCheck) {
                        router.push(`/en/profile?upload=true`);
                    } else {
                        // Ensure redirect path includes locale if it doesn't already
                        const redirectPath = redirect.startsWith(`/${locale}`) ? redirect : `/${locale}${redirect.startsWith('/') ? '' : '/'}${redirect}`;
                        router.push(redirectPath);
                    }
                } else {
                    throw new Error('Invalid response from server');
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setError(error.response?.data?.message || error.message || 'Failed to verify token');
                setLoading(false);
                
                // Get locale for redirect
                                
                // Redirect to login after a short delay
                setTimeout(() => {
                    router.push(`/en/login`);
                }, 2000);
            }
        };

        verifyToken();
    }, [router, searchParams]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
              Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <p className="text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return null;
};

const VerifyUser = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        }>
            <VerifyUserContent />
        </Suspense>
    );
};

export default VerifyUser;

