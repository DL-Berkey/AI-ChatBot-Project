"use client";

import { useOptimistic, startTransition, useState } from "react";

import { Conversation, ConversationList } from "@/types";
import { sendMessageToOpenAI } from "@/action/openai";
import { addConversation } from "@/action/conversation";
import MessageContainer from "./MessageContainer";
import MessageForm from "./MessageForm";

type Props = {
    messageData: {
        roomId: string;
        conversationList: ConversationList;
    };
};

const ConversationContainer = ({ messageData }: Props) => {
    const { roomId, conversationList } = messageData;

    const [pending, setPending] = useState(false);

    const [optimisticConversation, setOptimisticConversation] = useOptimistic<
        ConversationList,
        Conversation
    >(conversationList, (messages, message) => [...messages, message]);

    const handleSubmit = async (message: string) => {
        setPending(true);

        if (message === "" || !message) return;

        await addConversation({
            roomId: roomId,
            role: "user",
            content: message,
        });

        startTransition(() =>
            setOptimisticConversation({
                user_id: "",
                id: 0,
                created_at: "",
                name: "",
                role: "user",
                content: message,
                roomId,
            })
        );

        const context = optimisticConversation.slice(-10);

        const replyMessage = await sendMessageToOpenAI([
            ...context,
            { role: "user", content: message },
        ]);

        if (replyMessage) {
            const reply = replyMessage.message;

            await addConversation({
                roomId: roomId,
                role: reply.role,
                content: reply.content ?? "",
            });

            startTransition(() => {
                setOptimisticConversation({
                    user_id: "",
                    role: reply.role,
                    content: reply.content ?? "",
                    roomId,
                    id: 0,
                    created_at: "",
                    name: "",
                });
            });
        }

        setPending(false);
    };

    return (
        <main className="w-5/6 h-[52rem] mx-auto border flex justify-between flex-col">
            <MessageContainer
                pending={pending}
                conversationList={optimisticConversation}
            />
            <MessageForm pending={pending} handleSubmit={handleSubmit} />
        </main>
    );
};

export default ConversationContainer;
