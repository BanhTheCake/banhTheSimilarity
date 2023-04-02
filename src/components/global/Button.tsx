'use client';

import React, { FC } from 'react';
import { variantProps, VariantPropsOf } from 'classname-variants/react';
import cn from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export const buttonVariant = variantProps({
    base: 'text-slate-800 dark:text-white font-[500] text-[14px] p-2 px-4 rounded-md focus:ring-2 focus:ring-slate-400 transition-all active:scale-95 ring-offset-1 ring-offset-white dark:ring-offset-slate-900 flex gap-2 items-center disabled:opacity-70 disabled:pointer-events-none outline-none border-none',
    variants: {
        variant: {
            text: 'underline-offset-4 hover:underline',
            ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800',
            default: 'bg-black/80 text-white dark:bg-slate-200 dark:text-black',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantPropsOf<typeof buttonVariant> {
    isLoading?: boolean;
}

const Button: FC<ButtonProps> = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>(
    (
        {
            className,
            variant = 'default',
            children,
            isLoading = false,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                {...props}
                disabled={disabled || isLoading}
                className={cn(buttonVariant({ variant }).className, className)}
                ref={ref}
            >
                {isLoading && (
                    <Loader2 size={'18px'} className="animate-spin flex" />
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'button';

export default Button;
