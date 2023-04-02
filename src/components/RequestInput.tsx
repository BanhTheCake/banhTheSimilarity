'use client';

import { FC, useState } from 'react';
import Button from './global/Button';
import { Copy } from 'lucide-react';
import WithCopyBtn from '@/helpers/WithCopyBtn';
import createNewApiKey from '@/lib/api/createNewApiKey';
import { useRouter } from 'next/navigation';

interface RequestInputProps {}

const RequestInput: FC<RequestInputProps> = ({}) => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateNewApiKey = async () => {
        setIsLoading(true);
        try {
            const newApiKey = await createNewApiKey();
            setValue(newApiKey.key);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center items-stretch space-y-4 md:space-y-0 md:space-x-6 flex-col md:flex-row ">
            <div className="relative w-full md:w-fit">
                <input
                    type="text"
                    value={value}
                    readOnly
                    className="h-[40px] p-2 pr-10 rounded-md border shadow-sm border-slate-300 bg-slate-50 dark:bg-slate-900 dark:border-slate-600 w-full md:w-[400px] max-w-full"
                />
                <WithCopyBtn value={value}>
                    <Button
                        className="absolute inset-y-0 right-0 px-3 hover:bg-transparent hover:opacity-60"
                        variant="ghost"
                    >
                        <Copy />
                    </Button>
                </WithCopyBtn>
            </div>
            <Button
                isLoading={isLoading}
                disabled={Boolean(value)}
                onClick={handleCreateNewApiKey}
            >
                <p className="text-center w-full">Request key</p>
            </Button>
        </div>
    );
};

export default RequestInput;
