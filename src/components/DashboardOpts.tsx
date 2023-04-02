'use client';

import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Button from './global/Button';
import { Settings } from 'lucide-react';
import WithCopyBtn from '@/helpers/WithCopyBtn';
import createNewApiKey from '@/lib/api/createNewApiKey';
import { toast } from '@/lib/customToast';
import { useRouter } from 'next/navigation';
import revokeApiKey from '@/lib/api/revokeApiKey';
type Props = {
    apiKey: string;
};

const DashboardOpts = ({ apiKey }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const router = useRouter();

    const handleClick = async (
        key: string,
        func: (...args: any[]) => Promise<any>
    ) => {
        setIsLoading(true);
        setValue(key);
        try {
            await func();
            return 'success';
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    header: 'Error',
                    msg: error.message,
                });
                return 'error';
            }
            toast({
                header: 'Error',
                msg: 'Internal Server',
            });
            return 'error';
        } finally {
            setIsLoading(false);
            setValue('');
            router.refresh();
        }
    };

    const handleCreateApiKey = async () => {
        const status = await handleClick('Creating new api', createNewApiKey);
        if (status === 'success') {
            toast({
                header: 'Success',
                msg: 'Create new api key successful',
            });
        }
    };

    const handleRevokeKey = async () => {
        const status = await handleClick('Revoking api key', revokeApiKey);
        if (status === 'success') {
            toast({
                header: 'Success',
                msg: 'Revoke api key successful',
            });
        }
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button className="p-2" variant="default" isLoading={isLoading}>
                    {!value && <Settings />}
                    {value && <p className="hidden md:flex">{value}</p>}
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="relative z-50 bg-white shadow dark:bg-slate-800 dark:shadow-white/10 p-[5px] text-[14px] dark:text-slate-300 text-slate-700 animate-in fade-in duration-200"
                    sideOffset={10}
                    align="end"
                >
                    <DropdownMenu.Item className="border-none outline-none">
                        <WithCopyBtn value={apiKey}>
                            <Button
                                className="focus:ring-transparent outline-none border-none w-full"
                                variant="ghost"
                            >
                                Copy
                            </Button>
                        </WithCopyBtn>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="border my-1 border-slate-100" />
                    <DropdownMenu.Item className="border-none outline-none">
                        <Button
                            className="focus:ring-transparent outline-none border-none w-full"
                            variant="ghost"
                            onClick={handleCreateApiKey}
                        >
                            Create new key
                        </Button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="border my-1 border-slate-100" />
                    <DropdownMenu.Item className="border-none outline-none">
                        <Button
                            className="focus:ring-transparent outline-none border-none w-full"
                            variant="ghost"
                            onClick={handleRevokeKey}
                        >
                            Revoke key
                        </Button>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default DashboardOpts;
