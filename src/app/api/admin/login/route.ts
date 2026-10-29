import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { connectDB, prisma } from '@/lib/db';
import { signToken } from '@/lib/jwt';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

// Email + password only. ADMIN_SECRET_KEY is still required, but only on the
// server: it keys the password hash and signs the session cookie. It is no
// longer something the person logging in has to type, and there is no OTP step.
function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const limitResult = rateLimit(ip, 5, 10 * 60 * 1000);
    if (!limitResult.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    await connectDB();
    const { email, password } = await req.json();

    const secret = process.env.ADMIN_SECRET_KEY;
    if (!secret) {
      throw new Error('ADMIN_SECRET_KEY env variable is not set');
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { email: String(email).toLowerCase().trim() } });
    const passwordHash = crypto.createHmac('sha256', secret).update(String(password)).digest('hex');
    if (!admin || !safeEqual(admin.passwordHash, passwordHash)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const sessionToken = signToken({ email: admin.email, authenticated: true }, 86400); // 24 hours
    const cookieStore = await cookies();
    cookieStore.set('__Host-admin_session', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Logged in successfully' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
