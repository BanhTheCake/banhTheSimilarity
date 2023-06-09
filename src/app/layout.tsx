import Navbar from '@/components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import cn from '@/utils/cn';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'bg-slate-50 dark:bg-slate-900 antialiased',
                    inter.className
                )}
            >
                <NextTopLoader showSpinner={false} />
                <Providers>
                    <>
                        {/* @ts-expect-error Server Component */}
                        <Navbar />
                        <div className="pt-20 min-h-screen container max-w-7xl mx-auto px-4 flex flex-col overflow-x-hidden pb-10">
                            {children}
                        </div>
                    </>
                </Providers>
            </body>
        </html>
    );
}
