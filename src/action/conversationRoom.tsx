"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import { getUserData } from "./account";
import { RoomList } from "@/types";

export const getConversationRoomList = async (page: number) => {
    const client = await createClient();

    const from = (page - 1) * 9;
    const to = from + 8;

    const user = await getUserData();

    if (!user) return { roomList: [], count: 0 };

    const { data, error } = await client.rpc("get_last_conversation_content", {
        from_row: from,
        take_row: to,
    });

    if (!data || error) return { roomList: [], count: 0 };

    const result = data.map((value) => {
        return {
            ...value,
        };
    }) as RoomList;

    return {
        roomList: result,
        count: data[0] ? data[0].total_rooms : 0,
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
