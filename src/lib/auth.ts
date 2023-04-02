import { type AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prismaDB } from './prisma';

const generateGoogle = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const secretId = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || clientId.length === 0) {
        throw new Error('No ClientId provider !');
    }

    if (!secretId || secretId.length === 0) {
        throw new Error('No SecretId provider');
    }

    return {
        clientId,
        secretId,
    };
};

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prismaDB),
    providers: [
        GoogleProvider({
            clientId: generateGoogle().clientId,
            clientSecret: generateGoogle().secretId,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            // User may undefine => must check
            if (user) {
                const existUser = await prismaDB.user.findFirst({
                    where: { email: user?.email },
                });
                if (existUser) {
                    return {
                        ...token,
                        id: existUser.id,
                        email: existUser.email,
                        name: existUser.name,
                        picture: existUser.image,
                    };
                }
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (token) {
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.name = token.name;
                session.user.id = token.id;
            }
            return session;
        },
    },
};
