import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

import { CookieToSet } from "./server";

export const updateSession = async (request: NextRequest) => {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet: CookieToSet[]) {
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

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isAuthenticationPath = ["/login", "/register", "/account"].some(
        (path) => request.nextUrl.pathname.startsWith(path)
    );

    const isUnAuthenticationPath = [
        "/login",
        "/register",
        "/account",
        "/conversation/guest",
        "/api/auth",
    ].some((path) => request.nextUrl.pathname.startsWith(path));

    // authentication 라우터 제한
    if (user && isAuthenticationPath) {
        const url = request.nextUrl.clone();

        url.pathname = "/";

        return NextResponse.redirect(url);
    }

    if (!user && !isUnAuthenticationPath) {
        const url = request.nextUrl.clone();

        url.pathname = "/conversation/guest";

        return NextResponse.redirect(url);
    }

    return supabaseResponse;
};
