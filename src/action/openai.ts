"use server";

import { OpenAI_Messages } from "@/types";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});

export const sendMessageToOpenAI = async (messages: OpenAI_Messages) => {
    if (messages.length === 0) {
        return null;
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
    });

    return completion.choices[0];
};
