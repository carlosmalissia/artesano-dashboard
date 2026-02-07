import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
    (await cookies()).set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })

  return NextResponse.json({ success: true })
}
