import OpenAI from "openai";
import { Database } from "./supabase";

export type OpenAI_Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export type OpenAI_Messages =
    OpenAI.Chat.Completions.ChatCompletionMessageParam[];

export type RoomData =
    Database["public"]["Tables"]["ConversationRoom"]["Row"] & {
        Conversation: DatabaseConversation[];
        lastConversationContent: DatabaseConversation[];
        lastConversationTime: string;
    };

export type DatabaseConversation =
    Database["public"]["Tables"]["Conversation"]["Row"];

export type Conversation = Omit<DatabaseConversation, "role"> & {
    role: "user" | "assistant";
};

export type ConversationList = Conversation[];

export type LoginData = {
    id: string;
    password: string;
};
