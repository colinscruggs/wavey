'use client';

import { SessionProvider } from 'next-auth/react';

type Props = {
    children: React.ReactNode;
};

// allows any client-side component to access the current user session
export default function AuthProvider({ children }: Props) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}