'use client';

import { FC } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import Button from './global/Button';
import { Settings, File, Sun, Moon, LogIn, LogOut, Album } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

interface AuthBtnProps {
    isLogin: boolean;
}

const AuthBtn: FC<AuthBtnProps> = ({ isLogin }) => {
    return (
        <>
            {isLogin ? (
                <LogOut
                    size={'20px'}
                    className="dark:text-slate-300 text-slate-700"
                />
            ) : (
                <LogIn
                    size={'20px'}
                    className="dark:text-slate-300 text-slate-700"
                />
            )}
            {isLogin ? <p>Sign out</p> : <p>Sign in</p>}
        </>
    );
};

const Opts = [
    {
        name: 'Documentation',
        Icon: File,
        href: '/documentation',
        isProtect: false,
    },
    {
        name: 'Dashboard',
        Icon: Album,
        href: '/dashboard',
        isProtect: true,
    },
];

const MobileMenu = () => {
    const { theme, setTheme, systemTheme } = useTheme();
    const { data } = useSession();

    const handleToggle = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const themeValue = theme === 'system' ? systemTheme : theme;
    const IconMode = theme === 'dark' ? Moon : Sun;
    const isLogin = data ? true : false;

    const handleSignIn = () => {
        signIn('google');
    };

    const handleSignOut = () => {
        signOut();
    };

    return (
        <div className="flex md:hidden">
            <Dropdown.Root>
                <Dropdown.Trigger asChild>
                    <Button className="p-2" variant="ghost">
                        <Settings />
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Portal>
                    <Dropdown.Content
                        className="relative z-50 bg-white shadow dark:bg-slate-800 dark:shadow-white/10 p-[5px] text-[14px] dark:text-slate-300 text-slate-700 animate-in fade-in duration-200"
                        sideOffset={10}
                        align="end"
                    >
                        {Opts.map((item) => {
                            if (item.isProtect && !isLogin) return null;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <Dropdown.Item className="flex space-x-3 items-center p-1.5 px-3 hover:bg-black/10 dark:hover:bg-slate-700 capitalize outline-none border-none">
                                        <item.Icon
                                            size={'20px'}
                                            className="dark:text-slate-300 text-slate-700"
                                        />
                                        <p>{item.name}</p>
                                    </Dropdown.Item>
                                </Link>
                            );
                        })}

                        {/* Mode */}

                        <Dropdown.Item
                            className="p-1.5 px-3 hover:bg-black/10 dark:hover:bg-slate-700 flex space-x-3 items-center cursor-pointer capitalize outline-none border-none"
                            onClick={handleToggle}
                        >
                            <IconMode
                                size={'20px'}
                                className="dark:text-slate-300 text-slate-700"
                            />
                            <p>{themeValue}</p>
                        </Dropdown.Item>
                        <Dropdown.Separator className="h-[1px] bg-slate-200 m-[5px]" />

                        {/* Auth */}

                        <Dropdown.Item
                            className="p-1.5 px-3 hover:bg-black/10 dark:hover:bg-slate-700 flex space-x-3 items-center cursor-pointer capitalize outline-none border-none font-semibold"
                            onClick={() => {
                                isLogin ? handleSignOut() : handleSignIn();
                            }}
                        >
                            <AuthBtn isLogin={isLogin} />
                        </Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Portal>
            </Dropdown.Root>
        </div>
    );
};

export default MobileMenu;
