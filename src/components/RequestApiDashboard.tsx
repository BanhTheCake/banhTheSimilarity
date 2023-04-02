'use client';

import { FC } from 'react';
import { Key, Copy } from 'lucide-react';
import LargeHeading from './global/LargeHeading';
import Button from './global/Button';
import RequestInput from './RequestInput';

interface RequestApiDashboardProps {}

const RequestApiDashboard: FC<RequestApiDashboardProps> = ({}) => {
    return (
        <div className="flex-1 w-full h-full flex flex-col items-center justify-center space-y-6 -mt-28">
            <Key size={'60px'} className="text-slate-300" />
            <LargeHeading className="text-center" size="medium">
                Request your API key
            </LargeHeading>
            <p className="text-slate-700 dark:text-slate-100 mt-3 text-center">
                You haven&apos;t requested an API key yet.
            </p>
            <RequestInput />
        </div>
    );
};

export default RequestApiDashboard;
