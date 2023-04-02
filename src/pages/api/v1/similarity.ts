import openai from '@/lib/openai';
import { prismaDB } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export function cosineSimilarity(A: number[], B: number[]) {
    var dotproduct = 0;
    var mA = 0;
    var mB = 0;
    for (let i = 0; i < A.length; i++) {
        // here you missed the i++
        dotproduct += A[i] * B[i];
        mA += A[i] * A[i];
        mB += B[i] * B[i];
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = dotproduct / (mA * mB); // here you needed extra brackets
    return similarity;
}

const reqValidate = z.object({
    text1: z.string().max(100),
    text2: z.string().max(100),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const from = new Date();
    const token = req.headers['authorization'] || req.headers['Authorization'];

    if (!token) {
        return res.status(401).json('Missing api_key in headers.authorization');
    }

    const validApiKey = await prismaDB.apiKey.findFirst({
        where: { key: token as string },
    });

    if (!validApiKey || !validApiKey.enabled) {
        return res.status(400).json('Invalid api key');
    }
    try {
        const { text1, text2 } = reqValidate.parse(req.body);
        const embeddings = await Promise.all(
            [text1, text2].map(async (text) => {
                const res = await openai.createEmbedding({
                    model: 'text-embedding-ada-002',
                    input: text,
                });
                return res.data.data[0].embedding;
            })
        );
        const similarity = cosineSimilarity(embeddings[0], embeddings[1]);
        const duration = new Date().getTime() - from.getTime();

        await prismaDB.apiRequest.create({
            data: {
                duration: duration,
                method: req.method as string,
                path: req.url as string,
                status: 200,
                usedApiKey: validApiKey.key,
                apiKeyId: validApiKey.id,
            },
        });
        return res.status(200).json({ input: { text1, text2 }, similarity });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json(error.issues);
        }
        if (error instanceof Error) {
            return res.status(400).json(error.message);
        }
        const duration = new Date().getTime() - from.getTime();
        await prismaDB.apiRequest.create({
            data: {
                duration: duration,
                method: req.method as string,
                path: req.url as string,
                status: 500,
                usedApiKey: validApiKey.key,
                apiKeyId: validApiKey.id,
            },
        });
        return res.status(500).json('Internal server');
    }
};

export default handler;
