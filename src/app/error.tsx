'use client';

import Button from '@/components/global/Button';
import LargeHeading from '@/components/global/LargeHeading';
import { Wrench } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    console.log(error.message);

    return (
        <div className="flex-1 w-full h-full flex flex-col items-center justify-center gap-6">
            <Wrench size={80} className="text-slate-500" />
            <LargeHeading size="medium" className="text-center">
                Something wrong around here !
            </LargeHeading>
            <Button
                className="text-slate-500 font-[18px]"
                variant="ghost"
                onClick={() => reset()}
            >
                Please try again or reload the page{' '}
            </Button>
        </div>
    );
}
