import React, { FC } from 'react';
import Button from './global/Button';
import ThemePopover from './ThemePopover';
import MobileMenu from './MobileMenu';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import WithSignInBtn from '@/helpers/WithSignInBtn';
import WithSignOutBtn from '@/helpers/WithSignOutBtn';
import Link from 'next/link';

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="fixed inset-x-0 top-0 flex bg-white dark:bg-slate-900 shadow dark:shadow-white/40 dark:shadow-sm bg-opacity-80 z-50 backdrop-blur-md">
            <div className="container max-w-7xl flex items-center justify-between mx-auto p-4">
                <Link href={'/'}>
                    <Button variant="text">Text Similarity v1.0</Button>
                </Link>
                <div className="flex space-x-4 hidden md:flex">
                    <ThemePopover />
                    <Link href={'/documentation'}>
                        <Button className="" variant="ghost">
                            Documentation
                        </Button>
                    </Link>
                    {session ? (
                        <>
                            <Link href={'/dashboard'}>
                                <Button className="" variant="ghost">
                                    Dashboard
                                </Button>
                            </Link>
                            <WithSignOutBtn>
                                <Button>Sign Out</Button>
                            </WithSignOutBtn>
                        </>
                    ) : (
                        <WithSignInBtn>
                            <Button>Sign In</Button>
                        </WithSignInBtn>
                    )}
                </div>
                <MobileMenu />
            </div>
        </nav>
    );
};

export default Navbar;
