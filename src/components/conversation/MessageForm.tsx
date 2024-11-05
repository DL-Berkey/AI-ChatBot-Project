"use client";

import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
    pending: boolean;
    handleSubmit: (message: string) => Promise<void>;
};

const MessageForm = ({ pending, handleSubmit }: Props) => {
    const [message, setMessage] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                handleSubmit(message);

                setMessage("");
            }}
            className="px-5 h-[7%]"
        >
            <div className="flex items-center justify-center h-full gap-4">
                <Input
                    required
                    value={message}
                    placeholder="무엇이든 물어보세요!"
                    onChange={(e) => setMessage(e.target.value)}
                    className="text-lg outline outline-main outline-1"
                />
                <Button
                    type="submit"
                    disabled={pending}
                    className="p-2 text-sm text-white bg-main"
                >
                    물어보기
                </Button>
            </div>
        </form>
    );
};

export default MessageForm;
