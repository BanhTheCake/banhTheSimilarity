import { authOptions } from '@/lib/auth';
import { prismaDB } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    const user = session?.user;

    if (!user) {
        return res.status(401).json('Please Login');
    }

    const existApiKey = await prismaDB.apiKey.findFirst({
        where: { userId: user.id, enabled: true },
    });

    if (!existApiKey) {
        return res.status(400).json('Cannot revoke this api key');
    }

    await prismaDB.apiKey.update({
        where: { id: existApiKey.id },
        data: {
            enabled: false,
        },
    });

    return res.status(200).json('Revoke success');
};

export default handler;
