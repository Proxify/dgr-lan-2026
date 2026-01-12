import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const AUTH_TIMEOUT_MS = 5000;

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Validate session with timeout to prevent middleware hanging on bad cookies
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Auth timeout')), AUTH_TIMEOUT_MS)
    );

    await Promise.race([
      supabase.auth.getUser(),
      timeoutPromise,
    ]);
  } catch {
    // On auth error or timeout, clear auth cookies and continue
    const cookieNames = request.cookies.getAll()
      .filter(c => c.name.startsWith('sb-'))
      .map(c => c.name);

    for (const name of cookieNames) {
      supabaseResponse.cookies.delete(name);
    }
  }

  return supabaseResponse;
}
