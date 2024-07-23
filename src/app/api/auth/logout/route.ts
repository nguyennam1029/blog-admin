import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');


  if (!sessionToken) {
    return NextResponse.json(
      { message: 'Session token not received' },
      {
        status: 401,
      }
    );
  }

  // Create a new response to clear the cookie
  const response = NextResponse.json(
  { message: 'Logged out successfully' },
    { status: 200 }
  );

  // Set the cookie to expire immediately
  response.headers.set(
    'Set-Cookie',
    'sessionToken=; Path=/; HttpOnly; Max-Age=0'
  );

  return response;
}
