import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    const client = await createClient();

    if (!code) {
        return NextResponse.redirect(`${url.origin}`);
    }

    const { error } = await client.auth.exchangeCodeForSession(code);

    if (!error) {
        return NextResponse.redirect(`${url.origin}/change-password`);
    } else {
        return NextResponse.redirect(`${url.origin}`);
    }
}
