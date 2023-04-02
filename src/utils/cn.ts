import { clsx, ClassArray } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...input: ClassArray) => {
    return twMerge(clsx(input));
};

export default cn;
