'use client';

import React, { FC } from 'react';
import { toast } from '@/lib/customToast';

interface WithCopyBtnProps {
    children: React.ReactElement;
    value: string;
}

const WithCopyBtn: FC<WithCopyBtnProps> = ({ children, value }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        toast({
            header: 'Copied',
            msg: 'Content has been copy in your clipboard',
        });
    };

    if (React.Children.count(children) !== 1) {
        throw new Error('This component must has only one child');
    }

    return React.cloneElement(children, {
        onClick: () => handleCopy(),
    });
};

export default WithCopyBtn;
