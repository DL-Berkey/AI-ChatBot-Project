"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import { getUserData } from "./account";
import { RoomData } from "@/types";

export const getConversationRoomList = async (page: number) => {
    const client = await createClient();

    const from = (page - 1) * 9;
    const to = from + 8;

    const { data, error, count } = await client
        .from("ConversationRoom")
        .select("*, Conversation(*)", { count: "exact" })
        .range(from, to)
        .order("updated_at", { ascending: false });

    if (!data || error) return { roomList: [], count: 0 };

    const result = data.map((data) => {
        return {
            ...data,
            lastConversationContent: data.Conversation.slice(-3),
            lastConversationTime: "2024-09-09",
        };
    }) as RoomData[];
    return {
        roomList: result,
        count: count ?? 0,
    };
};

export const createConversationRoom = async (name: string) => {
    const client = await createClient();

    const user = await getUserData();

    if (!user) return;

    await client.from("ConversationRoom").insert({
        name,
        user_id: user.id,
    });

    revalidatePath("/");
};

export const deleteConversationRoom = async (roomId: string) => {
    const client = await createClient();

    await client.from("ConversationRoom").delete().eq("id", roomId);

    revalidatePath("/");
};
