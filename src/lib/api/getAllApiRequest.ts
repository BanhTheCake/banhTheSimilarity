import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { prismaDB } from '../prisma';
import { ApiRequestT } from '@/types/apiRequest';

const getAllApiRequest = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) throw new Error('Please login');

    const apiKeys = await prismaDB.apiKey.findMany({
        where: { userId: user.id },
        include: {
            apiRequest: true,
        },
    });

    const apiRequests = apiKeys.reduce((rs, key) => {
        return [...rs, ...key.apiRequest];
    }, [] as ApiRequestT[]);

    const formatData = apiRequests.map((key) => {
        if (key) return { ...key, timestamp: key.timestamp.toISOString() };
        return key;
    });

    return formatData;
};

export default getAllApiRequest;
