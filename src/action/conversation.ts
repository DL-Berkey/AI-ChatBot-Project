"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import { Conversation, ConversationList } from "@/types";
import { createConversationRoom } from "./conversationRoom";
import { getUserData } from "./account";

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
                user_id: user.id,
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

// TODO: Guest Conversation 저장 Feature
// export const addGuestConversationList = async (
//     guestConversationList: ConversationList
// ) => {
//     console.log("hi");
//     const roomId = await createConversationRoom("게스트 채팅방");
//     console.log("🚀 ~ addGuestConversationList ~ roomId:", roomId);

//     const jobArray = [];
// };

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
