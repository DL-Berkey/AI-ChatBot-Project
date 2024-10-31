import { Bot, UserRound, X } from "lucide-react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { OpenAI_Messages } from "@/types";

type TempData = {
    roomName: string;
    lastConversationContent: OpenAI_Messages;
    lastConversationTime: string;
};

type Props = {
    roomData: TempData;
};

const ConversationRoom = ({ roomData }: Props) => {
    return (
        <Card className="relative overflow-hidden dark:shadow-main">
            <Button className="absolute top-0 right-0 p-0 px-2 text-main">
                <X className="scale-125" />
            </Button>
            <CardHeader className="py-5">
                <CardTitle className="text-lg truncate">
                    {roomData.roomName}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {roomData.lastConversationContent.map((conversation, idx) => {
                    if (idx >= 3) return;

                    if (typeof conversation.content !== "string") return;

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
                            <p className="truncate">{conversation.content}</p>
                        </div>
                    );
                })}
            </CardContent>
            <CardFooter className="block pb-2 text-sm text-right text-gray-400">
                {roomData.lastConversationTime}
            </CardFooter>
        </Card>
    );
};

export default ConversationRoom;
