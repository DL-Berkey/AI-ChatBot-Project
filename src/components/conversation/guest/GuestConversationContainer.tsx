"use client";

import { startTransition, useState } from "react";

import { ConversationList } from "@/types";
import { sendMessageToOpenAI } from "@/action/openai";
import { getFormattedTime } from "@/lib/utils";
import {
    addConversationToSession,
    getConversationListFromSession,
} from "@/lib/conversation";
import MessageContainer from "../MessageContainer";
import MessageForm from "../MessageForm";

const GuestConversationContainer = () => {
    const [pending, setPending] = useState(false);

    const [conversation, setConversation] = useState<ConversationList>(() =>
        getConversationListFromSession()
    );

    const handleSubmit = async (message: string) => {
        setPending(true);

        if (message === "" || !message) return;

        addConversationToSession({
            user_id: "guest",
            id: 0,
            created_at: getFormattedTime("now"),
            name: "guest",
            role: "user",
            content: message,
            roomId: "guest room",
        });

        startTransition(() =>
            setConversation((prev) => {
                return [
                    ...prev,
                    {
                        user_id: "guest",
                        id: 0,
                        created_at: getFormattedTime("now"),
                        name: "guest",
                        role: "user",
                        content: message,
                        roomId: "guest room",
                    },
                ];
            })
        );

        const context = conversation.slice(-10);

        const replyMessage = await sendMessageToOpenAI([
            ...context,
            { role: "user", content: message },
        ]);

        if (replyMessage) {
            const reply = replyMessage.message;

            addConversationToSession({
                user_id: "guest",
                id: 0,
                created_at: getFormattedTime("now"),
                name: "guest",
                role: reply.role,
                content: reply.content ?? "",
                roomId: "guest room",
            });

            startTransition(() => {
                setConversation((prev) => {
                    return [
                        ...prev,
                        {
                            user_id: "guest",
                            id: 0,
                            created_at: getFormattedTime("now"),
                            name: "guest",
                            role: reply.role,
                            content: reply.content ?? "",
                            roomId: "guest room",
                        },
                    ];
                });
            });
        }

        setPending(false);
    };

    return (
        <main className="relative max-md:h-[90%] w-5/6 h-[52rem] mx-auto border flex justify-between flex-col">
            <MessageContainer
                pending={pending}
                conversationList={conversation}
            />
            <MessageForm pending={pending} handleSubmit={handleSubmit} />
        </main>
    );
};

export default GuestConversationContainer;
