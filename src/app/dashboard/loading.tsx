import LargeHeading from '@/components/global/LargeHeading';
import { Loader2 } from 'lucide-react';

const DashboardLoading = ({}) => {
    return (
        <div className="flex-1 w-full h-full flex-col flex items-center justify-center space-y-6">
            <LargeHeading className="text-center font-normal" size="small">
                Preparing the dashboard
            </LargeHeading>
            <Loader2
                size={40}
                className="animate-spin duration-1000 text-slate-800 dark:text-slate-100"
            />
        </div>
    );
};

export default DashboardLoading;
