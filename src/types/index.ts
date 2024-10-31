import OpenAI from "openai";
import { Database } from "./supabase";

export type OpenAI_Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export type OpenAI_Messages =
    OpenAI.Chat.Completions.ChatCompletionMessageParam[];

export type RoomData = Database["public"]["Tables"]["ConversationRoom"];
