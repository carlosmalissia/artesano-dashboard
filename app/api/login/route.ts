import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
      email,
      password,
    })

    const token = res.data.token;
    (await cookies()).set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Login fallido' }, { status: 401 })
  }
}
