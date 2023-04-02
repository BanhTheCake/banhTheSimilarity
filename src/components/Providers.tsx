'use client';

import { FC } from 'react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import Toaster from '@/lib/customToast';

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <>
            <ThemeProvider attribute="class" enableSystem defaultTheme="light">
                <SessionProvider>{children}</SessionProvider>
                <Toaster position="bottom-right" />
            </ThemeProvider>
        </>
    );
};

export default Providers;
