"use client";

import { useEffect, useRef, useState } from "react";

import { ConversationList } from "@/types";
import MessageCard from "./MessageCard";
import { Button } from "../ui/button";

import { ChevronDown, LoaderCircle } from "lucide-react";

type Props = {
    conversationList: ConversationList;
};

const MessageContainer = ({ conversationList }: Props) => {
    const messageContainerRef = useRef<HTMLDivElement | null>(null);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const messageContainer = messageContainerRef.current;

        const handleScroll = () => {
            if (!messageContainer) return;

            const isBottom =
                messageContainer.scrollTop + messageContainer.clientHeight >=
                messageContainer.scrollHeight;
            console.log("🚀 ~ handleScroll ~ isBottom:", isBottom);

            if (!isBottom) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        if (messageContainer) {
            messageContainer.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (messageContainer) {
                messageContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (messageContainerRef.current !== null) {
            messageContainerRef.current.scrollTo({
                top: messageContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [conversationList.length]);

    return (
        <div
            ref={messageContainerRef}
            className="relative space-y-5 px-4  overflow-scroll h-[92%] bg-zinc-100 dark:bg-black py-5"
        >
            {conversationList.map((data, idx) => {
                if (typeof data.content === "string") {
                    return <MessageCard key={idx} message={data} />;
                }
            })}
            {conversationList.length >= 1 &&
                conversationList[conversationList.length - 1].role ===
                    "user" && (
                    <div>
                        <LoaderCircle className="mx-auto animate-spin size-8 dark:text-main" />
                    </div>
                )}

            {isScrolled && (
                <Button
                    size="icon"
                    variant="default"
                    onClick={() => {
                        if (messageContainerRef.current !== null) {
                            // messageContainerRef.current.scrollTop =
                            //     messageContainerRef.current.scrollHeight;

                            messageContainerRef.current.scrollTo({
                                top: messageContainerRef.current.scrollHeight,
                                behavior: "smooth",
                            });
                        }
                    }}
                    className="fixed translate-x-1/2 bottom-32 right-1/2 bg-main"
                >
                    <ChevronDown className="text-white scale-150" />
                </Button>
            )}
        </div>
    );
};

export default MessageContainer;
