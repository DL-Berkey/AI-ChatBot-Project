import OpenAI from "openai";
import { Database } from "./supabase";

export type OpenAI_Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export type OpenAI_Messages =
    OpenAI.Chat.Completions.ChatCompletionMessageParam[];

type UpdateProperty<T, K extends keyof T, V> = {
    [P in keyof T]: P extends K ? V : T[P];
};

export type DatabaseRoomList =
    Database["public"]["Functions"]["get_last_conversation_content"]["Returns"];

export type Room = UpdateProperty<
    DatabaseRoomList extends (infer U)[] ? U : never,
    "last_conversation_content",
    Conversation[]
>;

export type RoomList = Room[];

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
