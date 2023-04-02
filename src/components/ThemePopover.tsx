'use client';

import { FC } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Moon, Sun, Laptop2 } from 'lucide-react';
import Button from './global/Button';
import { useTheme } from 'next-themes';

interface ThemePopoverProps {}

const themeMode = [
    { value: 'dark', name: 'Dark', Icon: Moon },
    { value: 'light', name: 'Light', Icon: Sun },
    { value: 'system', name: 'System', Icon: Laptop2 },
];

const ThemePopover: FC<ThemePopoverProps> = ({}) => {
    const { theme, setTheme, systemTheme } = useTheme();
    const themeValue = theme === 'system' ? systemTheme : theme;

    const handleChangeMode = (value: string) => {
        setTheme(value);
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button className="p-2" variant="ghost">
                    {themeValue === 'dark' ? (
                        <Moon className="animate-in animate-out" />
                    ) : (
                        <Sun className="animate-in animate-out" />
                    )}
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="relative z-50 bg-white shadow dark:bg-slate-800 dark:shadow-white/10 p-[5px] text-[14px] dark:text-slate-300 text-slate-700 animate-in fade-in duration-200"
                    sideOffset={10}
                    align="end"
                >
                    {themeMode.map((item) => {
                        return (
                            <DropdownMenu.Item
                                key={item.value}
                                className="p-1.5 px-3 hover:bg-black/10 dark:hover:bg-slate-700 flex gap-3 items-center cursor-pointer capitalize outline-none border-none"
                                onClick={() => handleChangeMode(item.value)}
                            >
                                <item.Icon
                                    size={'20px'}
                                    className="dark:text-slate-300 text-slate-700"
                                />
                                <p>{item.name}</p>
                            </DropdownMenu.Item>
                        );
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default ThemePopover;
