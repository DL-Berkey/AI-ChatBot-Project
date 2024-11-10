"use server";

import { redirect } from "next/navigation";

import { LoginData } from "@/types";
import { createClient } from "@/lib/supabase/server";

export const register = async ({
    nickname,
    email,
    id,
    password,
}: LoginData & { nickname: string; email: string }) => {
    const client = await createClient();

    const { data, error: signUpError } = await client.auth.signUp({
        email,
        password,
        options: {
            data: {
                displayName: nickname,
            },
        },
    });

    if (signUpError || !data.user) {
        console.log("🚀 ~ signUpError:", signUpError);

        return null;
    }

    const { error: accountError } = await client.from("UserAccount").insert({
        nickname: nickname,
        auth_id: data.user.id,
        email: data.user.email,
        account_id: id,
    });

    if (accountError) {
        return null;
    }

    return data.user;
};

export const verifyOtp = async (email: string, otpCode: string) => {
    const client = await createClient();

    const { data, error } = await client.auth.verifyOtp({
        type: "signup",
        email: email,
        token: otpCode,
    });

    if (data.user !== null) {
        return true;
    }

    if (error) {
        return false;
    }

    return false;
};

export const checkEmail = async (email: string) => {
    const client = await createClient();

    const { data } = await client
        .from("UserAccount")
        .select()
        .eq("email", email);

    if (!data || data.length > 0) return false;

    return true;
};

export const checkId = async (id: string) => {
    const client = await createClient();

    const { data } = await client
        .from("UserAccount")
        .select()
        .eq("account_id", id);

    if (!data || data.length > 0) return false;

    return true;
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

    // account_id는 unique임
    const { data: loginData, error } = await client.auth.signInWithPassword({
        email: data[0].email,
        password,
    });

    if (error) {
        return null;
    }

    return loginData.user;
};

export const logout = async () => {
    const client = await createClient();

    await client.auth.signOut();

    redirect("/login");
};

export const isExistingUser = async (nickname: string, email: string) => {
    const client = await createClient();

    const { data, error } = await client
        .from("UserAccount")
        .select()
        .eq("nickname", nickname)
        .eq("email", email);

    if (!data || data.length === 0 || error) return null;

    const maskingAcocuntId = data[0].account_id.slice(0, -3) + "***";

    return {
        auth_id: data[0].auth_id,
        account_id: maskingAcocuntId,
    };
};

export const changePassword = async ({
    nickname,
    email,
    password,
}: {
    nickname: string;
    email: string;
    password: string;
}) => {
    const client = await createClient();

    // TODO: 서버에서만 auth_id와 account id가 노출 되게 코드 변경
    const user = await isExistingUser(nickname, email);

    if (!user) return null;

    const { error } = await client.rpc("update_user_password", {
        p_auth_id: user.auth_id,
        p_new_password: password,
    });

    if (error) return false;

    return true;
};

export const getUserData = async () => {
    const client = await createClient();
    const {
        data: { user },
        error,
    } = await client.auth.getUser();

    if (error) {
        return null;
    }

    return user;
};
