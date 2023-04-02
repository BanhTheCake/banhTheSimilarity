'use client';

import toastNPM, { Toaster } from 'react-hot-toast';

interface toastProps {
    msg: string;
    header: string;
    type?: 'error' | 'success';
}

export const toast = ({ msg, header, type = 'success' }: toastProps) => {
    toastNPM.custom(({ visible }) => {
        return (
            <div className="bg-black p-3 pb-4 px-6 shadow-sm text-white rounded-md w-fit max-w-full animate-in fade-in duration-300">
                <p className="capitalize font-[500]">{header}</p>
                <p className="text-white/90">{msg}</p>
            </div>
        );
    });
};

export default Toaster;
