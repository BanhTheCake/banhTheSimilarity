import ApiKeyDashboard from '@/components/ApiKeyDashboard';
import RequestApiDashboard from '@/components/RequestApiDashboard';
import getAllApiKey from '@/lib/api/getAllApikey';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | Similarity',
};

const Dashboard = async () => {
    const apiKey = await getAllApiKey();
    return (
        <>
            {apiKey ? (
                <>
                    {/* @ts-expect-error Server Component */}
                    <ApiKeyDashboard apiKey={apiKey} />
                </>
            ) : (
                <RequestApiDashboard />
            )}
        </>
    );
};

export default Dashboard;
