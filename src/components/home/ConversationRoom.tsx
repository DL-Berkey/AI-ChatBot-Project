"use client";

import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { Bot, UserRound, X } from "lucide-react";

import { RoomData } from "@/types";
import { deleteConversationRoom } from "@/action/conversationRoom";

type Props = {
    roomData: RoomData;
};

const ConversationRoom = ({ roomData }: Props) => {
    const router = useRouter();

    return (
        <Card
            className="relative overflow-hidden dark:shadow-main h-52 hover:cursor-pointer"
            onClick={(e) => {
                e.stopPropagation();

                const encoded = btoa(roomData.id);

                router.push(`/conversation/${encoded}`);
            }}
        >
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    deleteConversationRoom(roomData.id);
                }}
                className="absolute top-0 right-0 p-0 px-2 text-main"
            >
                <X className="scale-125" />
            </Button>
            <CardHeader className="py-5">
                <CardTitle className="text-lg truncate">
                    {roomData.name}
                </CardTitle>
            </CardHeader>
            {roomData.lastConversationContent.length !== 0 ? (
                <>
                    <CardContent className="pb-0 space-y-2 h-3/6">
                        {roomData.lastConversationContent.map(
                            (conversation, idx) => {
                                if (idx >= 3) return;

                                if (typeof conversation.content !== "string")
                                    return;

                                return (
                                    <div
                                        key={idx}
                                        title={conversation.content}
                                        className={cn(
                                            "flex w-4/5 ",
                                            conversation.role === "user" &&
                                                "justify-end ml-auto"
                                        )}
                                    >
                                        {conversation.role === "user" ? (
                                            <UserRound className="pb-1 scale-90 text-main shrink-0" />
                                        ) : (
                                            <Bot className="pb-1 text-gray-500 shrink-0" />
                                        )}
                                        <p className="truncate">
                                            {conversation.content}
                                        </p>
                                    </div>
                                );
                            }
                        )}
                    </CardContent>
                    <CardFooter className="block pb-2 text-sm text-right text-gray-400">
                        {roomData.lastConversationTime}
                    </CardFooter>
                </>
            ) : (
                <CardContent>
                    <p className="mt-5 text-center text-3xl">
                        대화 <span className="text-main">시작</span>하기
                    </p>
                </CardContent>
            )}
        </Card>
    );
};

export default ConversationRoom;
