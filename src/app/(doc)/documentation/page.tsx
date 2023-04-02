import LargeHeading from '@/components/global/LargeHeading';
import React from 'react';
import TabApiExample from '@/components/TabApiExample';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Documentation | Similarity',
    description: 'Document for Similarity Apis',
};

const DocumentationPage = () => {
    return (
        <div className="flex-1 w-full h-full flex flex-col items-center mt-3 mb-16 gap-3">
            <LargeHeading size="medium">Making a request</LargeHeading>
            <p className="text-slate-700 dark:text-slate-100 mt-3 text-center">
                api/v1/similarity
            </p>
            <TabApiExample />
        </div>
    );
};

export default DocumentationPage;
