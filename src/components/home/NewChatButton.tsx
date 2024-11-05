"use client";

import { Button, ButtonProps } from "../ui/button";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Input } from "../ui/input";

import { createConversationRoom } from "@/action/conversationRoom";

const NewChatButton = ({ className }: ButtonProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={cn(
                        "text-4xl text-main font-semibold",
                        className
                    )}
                >
                    +
                </Button>
            </PopoverTrigger>
            <PopoverContent asChild>
                <Card className="px-0">
                    <CardHeader className="pt-0 px-0 text-center">
                        <p>대화방 만들기</p>
                        <CardDescription>
                            한번 만든 대화방은 이름을 바꿀 수 없습니다.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                const input = e.currentTarget
                                    .elements[0] as HTMLInputElement;
                                const name = input.value;

                                createConversationRoom(name).then(() => {
                                    input.value = "";
                                });
                            }}
                            className="flex gap-2"
                        >
                            <Input maxLength={12} defaultValue="제목 없음" />
                            <Button type="submit" className="text-main">
                                추가
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    );
};

export default NewChatButton;