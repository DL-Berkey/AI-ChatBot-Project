import Markdown from "react-markdown";

import { Conversation } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

import { Bot } from "lucide-react";
import dayjs from "dayjs";

type Props = {
    message: Conversation;
};

const MessageCard = ({ message }: Props) => {
    if (typeof message.content !== "string") return null;

    const time =
        message.created_at !== ""
            ? dayjs(message.created_at).format("YYYY년 M월 D일 H시 m분")
            : dayjs().format("YYYY년 M월 D일 H시 m분");

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
                <Markdown
                    components={{
                        code: (props) => (
                            <code
                                className="px-1 font-sans text-lg underline rounded underline-offset-4 decoration-main "
                                {...props}
                            />
                        ),
                        pre: (props) => (
                            <pre
                                className="p-3 font-sans whitespace-pre-wrap border rounded bg-zinc-100 border-main dark:text-black dark:bg-zinc-300"
                                {...props}
                            />
                        ),
                        strong: (props) => (
                            <strong className="text-main" {...props} />
                        ),
                    }}
                >
                    {message.content}
                </Markdown>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">{time}</CardFooter>
        </Card>
    );
};

export default MessageCard;
