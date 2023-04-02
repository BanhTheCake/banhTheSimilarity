'use client';

import React, { FC, useState } from 'react';

interface WithCustomFuncBtnProps {
    children: React.ReactElement;
    func: (...props: any[]) => Promise<any>;
    callback?: (...props: any[]) => any;
}

const WithCustomFuncBtn: FC<WithCustomFuncBtnProps> = ({
    children,
    func,
    callback,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async () => {
        setIsLoading(true);
        try {
            await func();
        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            console.log('Internal Server !');
        } finally {
            setIsLoading(false);
            callback && callback();
        }
    };

    if (React.Children.count(children) !== 1) {
        throw new Error('This Component must has only one child');
    }

    return React.cloneElement(children, {
        isLoading: isLoading,
        onClick: () => handleClick(),
    });
};

export default WithCustomFuncBtn;
