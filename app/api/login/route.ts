import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  console.log('url: ', process.env.NEXT_PUBLIC_API_BASE_URL);

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
      email,
      password,
    })
    const token = res.data.token;
    console.log(token);

    (await cookies()).set('token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // o "strict"
      maxAge: 60 * 60 * 24, // 1 dia
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Login fallido' }, { status: 401 })
  }
}
