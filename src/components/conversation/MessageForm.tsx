"use client";

import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
    handleSubmit: (message: string) => Promise<void>;
};

const MessageForm = ({ handleSubmit }: Props) => {
    const [message, setMessage] = useState("");

    const [disabled, setDisabled] = useState(false);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                setDisabled(true);

                handleSubmit(message).then(() => setDisabled(false));

                setMessage("");
            }}
            className="px-5 h-[7%]"
        >
            <div className="flex items-center justify-center h-full gap-4">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="무엇이든 물어보세요!"
                    className="text-lg outline outline-main outline-1"
                />
                <Button
                    type="submit"
                    disabled={disabled}
                    className="p-2 text-sm text-white bg-main"
                >
                    물어보기
                </Button>
            </div>
        </form>
    );
};

export default MessageForm;
