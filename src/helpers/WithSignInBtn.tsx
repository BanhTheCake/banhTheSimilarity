'use client';

import React, { FC, useState } from 'react';
import { signIn } from 'next-auth/react';

interface WithSignInBtnProps {
    children: React.ReactElement;
}

const WithSignInBtn: FC<WithSignInBtnProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn('google', {
                callbackUrl: '/dashboard',
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
        onClick: () => handleSignIn(),
    });
};

export default WithSignInBtn;
