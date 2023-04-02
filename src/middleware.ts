import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { Ratelimit } from '@upstash/ratelimit';
import redis from './lib/redis';

const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'),
});

// Use withAuth will not include "/api/auth/session" (that belong to Next-Auth)
export default withAuth(
    async function middleware(request: NextRequest) {
        if (request.nextUrl.pathname.startsWith('/api/v1')) {
            // Limit api
            const ip = request.ip ?? '127.0.0.1';
            const { success } = await rateLimit.limit(ip);
            if (!success) {
                return NextResponse.json(
                    'It is allow to call api three times in one hour'
                );
            }
            return NextResponse.next();
        }
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });
        if (!token)
            return NextResponse.redirect(new URL('/login', request.url));
        return NextResponse.next();
    },
    {
        callbacks: {
            // Authorized to allow access the route or not
            authorized(params) {
                return true;
            },
        },
    }
);

export const config = {
    matcher: ['/dashboard/:path*', '/api/v1/:path*'],
};
