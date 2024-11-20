"use client";

import { useEffect, useRef, useState } from "react";

import { ConversationList } from "@/types";
import MessageCard from "./MessageCard";
import { Button } from "../ui/button";

import { ChevronDown, LoaderCircle } from "lucide-react";

type Props = {
    pending: boolean;
    conversationList: ConversationList;
};

const MessageContainer = ({ pending, conversationList }: Props) => {
    const messageContainerRef = useRef<HTMLDivElement | null>(null);

    const [isScrolled, setIsScrolled] = useState(false);

    const debounceTimeoutID = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // 새로운 대화가 추가되면 제일 아래로 이동
        if (messageContainerRef.current !== null) {
            messageContainerRef.current.scrollTo({
                top: messageContainerRef.current.scrollHeight,
            });
        }
    }, [conversationList.length]);

    return (
        <div
            ref={messageContainerRef}
            onScroll={(e) => {
                const target = e.currentTarget;

                if (!isScrolled) {
                    setIsScrolled(true);
                }

                if (debounceTimeoutID.current) {
                    clearTimeout(debounceTimeoutID.current);
                }

                // 잦은 호출을 방지하기 위한 debounce 적용 / 성능 향상 효과는 미비
                debounceTimeoutID.current = setTimeout(() => {
                    if (
                        target.scrollTop ===
                        target.scrollHeight - target.clientHeight
                    ) {
                        setIsScrolled(false);
                    }
                }, 200);
            }}
            className="max-h-[90dvh] max-md:w-full max-md:px-0 relative space-y-5 px-4  overflow-scroll h-[92%] bg-zinc-100 dark:bg-black py-5"
        >
            {conversationList.map((data, idx) => {
                if (typeof data.content === "string") {
                    const hasTypingEffect =
                        idx === conversationList.length - 1 &&
                        data.role === "assistant";

                    return (
                        <MessageCard
                            key={idx}
                            typingEffect={hasTypingEffect}
                            message={data}
                        />
                    );
                }
            })}
            {pending && (
                <div>
                    <LoaderCircle className="mx-auto animate-spin size-8 dark:text-main" />
                </div>
            )}

            {isScrolled && !pending && (
                <Button
                    size="icon"
                    variant="default"
                    onClick={() => {
                        if (messageContainerRef.current !== null) {
                            messageContainerRef.current.scrollTo({
                                top: messageContainerRef.current.scrollHeight,
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
