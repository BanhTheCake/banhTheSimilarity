import Button from '@/components/global/Button';
import LargeHeading from '@/components/global/LargeHeading';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import WithSignInBtn from '@/helpers/WithSignInBtn';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: ' Login | Similarity',
    description: 'Login to use Apis',
};

export default function LoginPage() {
    return (
        <div className="flex-1 w-full h-full flex items-center justify-center">
            <div className="flex flex-col space-y-4 items-center">
                <Link href={'/'}>
                    <Button
                        className="flex space-x-3 items-center font-semibold"
                        variant="ghost"
                    >
                        <ChevronLeft />
                        <p>Back to home</p>
                    </Button>
                </Link>
                <LargeHeading size="large" className="text-center">
                    Welcome back!
                </LargeHeading>
                <p>Please sign in using your Google account</p>

                {/* Google Btn */}

                <WithSignInBtn>
                    <Button className="w-full">
                        <p className="text-center w-full">Google</p>
                    </Button>
                </WithSignInBtn>
            </div>
        </div>
    );
}
