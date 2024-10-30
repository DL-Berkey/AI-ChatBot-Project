import OpenAI from "openai";

export type OpenAI_Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export type OpenAI_Messages =
    OpenAI.Chat.Completions.ChatCompletionMessageParam[];
