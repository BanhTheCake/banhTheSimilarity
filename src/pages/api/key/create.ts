import { authOptions } from '@/lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { prismaDB } from '@/lib/prisma';
import { nanoid } from 'nanoid';

// Next-auth work with cookie => you use method get will not use getServerSession (because cookies is not send with request => getServerSession will return null)

const handlers = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    const user = session?.user;

    if (!user) return res.status(401).json('Please login');

    const existApiKey = await prismaDB.apiKey.findFirst({
        where: { userId: user.id, enabled: true },
    });

    if (existApiKey) {
        await prismaDB.apiKey.update({
            where: { id: existApiKey.id },
            data: {
                enabled: false,
            },
        });
    }

    const newApiKey = await prismaDB.apiKey.create({
        data: {
            userId: user.id,
            key: nanoid(32),
        },
    });

    return res.status(200).json(newApiKey);
};

export default handlers;
