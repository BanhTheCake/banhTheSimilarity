import { prismaDB } from '../prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

const getAllApiKey = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) throw new Error('Please login !');

    const apiKey = await prismaDB.apiKey.findFirst({
        where: { userId: user.id, enabled: true },
    });

    return apiKey;
};

export default getAllApiKey;
