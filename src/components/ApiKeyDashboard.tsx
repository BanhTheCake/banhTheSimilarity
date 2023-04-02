import { ApiKeyT } from '@/types/key';
import LargeHeading from './global/LargeHeading';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';
import DashboardHistory from './DashboardHistory';
import DashboardOpts from './DashboardOpts';

interface ApiKeyDashboardProps {
    apiKey: ApiKeyT;
}

const ApiKeyDashboard = async ({ apiKey }: ApiKeyDashboardProps) => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) return notFound();

    return (
        <div className="flex-1 w-full h-full flex flex-col space-y-6 justify-center pt-4">
            <LargeHeading className="text-center md:text-left">
                Welcome back, {user.name}
            </LargeHeading>
            <div className="flex items-center gap-4 flex-col md:flex-row">
                <p className="text-[18px] dark:text-slate-100 text-slate-900 flex-shrink-0">
                    Your api key:
                </p>
                <div className="flex items-center space-x-4 w-full md:w-fit">
                    <input
                        type="text"
                        readOnly
                        value={apiKey.key}
                        className="p-2 md:w-[300px] flex-1 bg-slate-50 border rounded-md text-ellipsis border-slate-300 dark:bg-slate-900 dark:border-slate-500"
                    />
                    <DashboardOpts apiKey={apiKey.key} />
                </div>
            </div>
            <div>
                <p className="text-[18px] dark:text-slate-100 text-slate-900 mb-2">
                    Your Api History:{' '}
                </p>
                {/* @ts-expect-error Server Component */}
                <DashboardHistory />
            </div>
        </div>
    );
};

export default ApiKeyDashboard;
