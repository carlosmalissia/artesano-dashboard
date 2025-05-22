import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
      email,
      password,
    }, {
      withCredentials: true, // 👈 necesario para que la cookie del backend se guarde
    });

    return NextResponse.json({ success: true, usuario: res.data.usuario });
  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json({ success: false, message: 'Login fallido' }, { status: 401 });
  }
}
