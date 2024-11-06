"use server";

import { createClient } from "@/lib/supabase/server";

import { Conversation, ConversationList } from "@/types";
import { getUserData } from "./account";
import { revalidatePath } from "next/cache";

export const addConversation = async (
    data: Pick<Conversation, "roomId" | "role" | "content">
) => {
    const client = await createClient();

    const user = await getUserData();

    if (!user) return;

    if (typeof data.content === "string") {
        const { data: conversationData, error } = await client
            .from("Conversation")
            .insert({
                roomId: data.roomId,
                role: data.role,
                content: data.content,
                name: user.user_metadata.displayName,
            });

        if (error) {
            return null;
        }

        revalidatePath(`/conversation/${data.roomId}`);

        return conversationData;
    } else {
        return null;
    }
};

export const getConversationList = async (roomId: string) => {
    const client = await createClient();

    const { data, error } = await client
        .from("Conversation")
        .select()
        .eq("roomId", roomId)
        .order("created_at", { ascending: true });

    if (error || !data) {
        return [];
    }

    // TODO: will change better thing
    return data as ConversationList;
};
