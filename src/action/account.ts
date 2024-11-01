"use server";

import { LoginData } from "@/types";
import { createClient } from "@/lib/supabase/server";

export const register = async ({
    email,
    password,
}: LoginData & { email: string }) => {
    const client = await createClient();

    const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
            data: {
                displayName: "test",
            },
        },
    });

    const { error: tableerror } = await client.from("UserAccount").insert({
        auth_id: data.user?.id,
        email: data.user?.email,
        account_id: "test12",
    });
    console.log(
        "🚀 ~ const{error:tableerror}=awaitclient.from ~ tableerror:",
        tableerror
    );

    if (error?.code === "user_already_exists") {
        // user already exists errror handle

        return;
    }

    console.log("🚀 ~ error:", error);
};

export const login = async ({ id, password }: LoginData) => {
    const client = await createClient();

    const { data } = await client
        .from("UserAccount")
        .select()
        .eq("account_id", id);

    if (!data || data.length === 0) {
        return null;
    }

    // acount_id는 unique임
    const { data: loginData, error } = await client.auth.signInWithPassword({
        email: data[0].email,
        password,
    });

    if (error) {
        return null;
    }

    return loginData.user;
};

export const findid = async ({ id, password }: LoginData) => {
    const client = await createClient();
};

/**
 * user table
 * user-uuid user id user id created_at updated_at
 *
 *
 * auth table
 * id password
 *
 *
 * [register process]
 * 1. user account table에서 id 중복 췤
 * 2. id 췍
 * 3. 괜찮으면 auth table에 id 하고 password 추가
 * 4. 반환 된 auth table에서 얻은 auth id로 user table에 id id 추가!
 *
 * [login process]
 * 1. id, password 조회
 * 2. id로 user table 조회
 * 3. 거기서 얻은 id로 이제 다시 로그인을 시도 => 없으면 로그인 실패
 */
