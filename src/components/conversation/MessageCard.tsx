import { isValidElement } from "react";
import TypeIt, { TypeItProps } from "typeit-react";
import Markdown from "react-markdown";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn, getFormattedTime } from "@/lib/utils";
import { Button } from "../ui/button";

import { Bot, ClipboardPlus } from "lucide-react";

import { Conversation } from "@/types";

type Props = {
    typingEffect: boolean;
    message: Conversation;
};

const getFomattedMessage = (messageContent: string, typingEffect: boolean) => {
    const formattedMessage = (
        <Markdown
            components={{
                code: (props) => (
                    <code
                        className="px-1 font-sans text-lg underline rounded underline-offset-4 decoration-main "
                        {...props}
                    />
                ),
                pre: ({ children, ...node }) => {
                    let isCopyable = false;

                    let text = "";

                    // code를 복사하기 위해 code가 문자열인지 아닌지 확인
                    if (
                        isValidElement(children) &&
                        typeof children.props.children === "string" &&
                        typeof children.props.className === "string" &&
                        children.props.className.includes("language-")
                    ) {
                        isCopyable = true;

                        text = children.props.children;
                    }

                    return (
                        <pre
                            className="relative group p-3 font-sans whitespace-pre-wrap border rounded bg-zinc-100 border-main dark:text-black dark:bg-zinc-300"
                            {...node}
                        >
                            {isCopyable && (
                                <Button
                                    size="icon"
                                    onClick={() =>
                                        navigator.clipboard.writeText(text)
                                    }
                                    className="hidden group-hover:inline-flex absolute top-0 right-0 active:scale-90"
                                >
                                    <ClipboardPlus className="text-main scale-125" />
                                </Button>
                            )}
                            {children}
                        </pre>
                    );
                },
                strong: (props) => <strong className="text-main" {...props} />,
            }}
        >
            {messageContent}
        </Markdown>
    );

    return typingEffect ? (
        <TypeIt
            options={{
                speed: 25,
                cursor: false,
            }}
        >
            {formattedMessage}
        </TypeIt>
    ) : (
        formattedMessage
    );
};

const MessageCard = ({ typingEffect, message }: Props) => {
    if (typeof message.content !== "string") return null;

    const time = getFormattedTime(message.created_at);

    return (
        <Card
            className={cn(
                "w-4/5 dark:shadow-main",
                message.role == "user" && "ml-auto"
            )}
        >
            <CardHeader>
                {message.role == "user" ? (
                    <p>나: </p>
                ) : (
                    <Bot className="text-main" />
                )}
            </CardHeader>
            <CardContent className="whitespace-pre-wrap">
                {getFomattedMessage(message.content, typingEffect)}
            </CardContent>
            <CardFooter className="text-sm text-gray-500">{time}</CardFooter>
        </Card>
    );
};

export default MessageCard;
