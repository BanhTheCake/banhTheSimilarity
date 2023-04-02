'use client';

import React, { FC, useState } from 'react';
import { signOut } from 'next-auth/react';

interface WithSignOutProps {
    children: React.ReactElement;
}

const WithSignOutBtn: FC<WithSignOutProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOut({
                redirect: true,
                callbackUrl: '/',
            });
        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            console.log('Internal Server !');
        } finally {
            setIsLoading(false);
        }
    };

    if (React.Children.count(children) !== 1) {
        throw new Error('This Component must has only one child');
    }

    return React.cloneElement(children, {
        isLoading: isLoading,
        onClick: () => handleSignOut(),
    });
};

export default WithSignOutBtn;
