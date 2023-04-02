import { FC } from 'react';
import cn from '@/utils/cn';
import { VariantPropsOf, variantProps } from 'classname-variants/react';

const HeadingVariant = variantProps({
    base: 'font-bold leading-none tracking-tight text-black/80 dark:text-light-gold',
    variants: {
        size: {
            large: 'text-5xl md:text-6xl',
            medium: 'text-3xl md:text-5xl',
            small: 'text-2xl md:text-4xl',
        },
    },
    defaultVariants: {
        size: 'large',
    },
});

interface LargeHeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantPropsOf<typeof HeadingVariant> {
    children: React.ReactNode;
}

const LargeHeading: FC<LargeHeadingProps> = ({ children, className, size }) => {
    return (
        <h1 className={cn(HeadingVariant({ size }).className, className)}>
            {children}
        </h1>
    );
};

export default LargeHeading;
