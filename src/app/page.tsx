import LargeHeading from '@/components/global/LargeHeading';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Similarity',
    description: 'Check for similarity between 2 text',
};

export default function Home() {
    return (
        <div className="flex-1 flex justify-between items-center w-full h-full flex-col md:flex-row pt-10 md:pt-0">
            <div className="flex-1 flex flex-col items-center justify-center md:items-start">
                <LargeHeading className="text-center md:text-left">
                    Easily determine <br /> text similarity.
                </LargeHeading>
                <p className="text-slate-700 dark:text-slate-100 mt-3 text-center md:text-left w-[80%] mx-auto md:w-full">
                    With the Text Similarity API, you can easily determine the
                    similarity between two pieces of text with a free{' '}
                    <Link
                        href={'/dashboard'}
                        className="text-dark-gold dark:text-light-gold underline underline-offset-4 font-semibold"
                    >
                        API key
                    </Link>
                </p>
            </div>
            <div className="relative flex-1 w-full aspect-square">
                <Image
                    src={'/typewriter.png'}
                    alt="Similarity"
                    priority
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
            </div>
        </div>
    );
}
