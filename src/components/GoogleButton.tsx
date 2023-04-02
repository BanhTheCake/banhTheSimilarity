'use client';

import { FC, useState } from 'react';
import Button from './global/Button';
import { signIn } from 'next-auth/react';

interface GoogleButtonProps {}

const GoogleButton: FC<GoogleButtonProps> = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn('google');
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            console.log('Internal Server !');
        }
    };

    return (
        <Button className="w-full" onClick={handleSignIn}>
            <p className="text-center w-full">Google</p>
        </Button>
    );
};

export default GoogleButton;
