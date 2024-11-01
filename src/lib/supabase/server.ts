import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

import { Database } from "@/types/supabase";

export type CookieToSet = {
    name: string;
    value: string;
    options?: CookieOptions;
};

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet: CookieToSet[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch (e: unknown) {
                        console.error(e);
                    }
                },
            },
        }
    );
}
