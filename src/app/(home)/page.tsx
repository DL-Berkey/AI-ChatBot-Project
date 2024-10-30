"use client";

import { useState } from "react";

import { sample } from "@/action/clova";
import { sendMessageToOpenAI } from "@/action/openai";
import { OpenAI_Messages } from "@/types";

const Home = () => {
    const [conversation, setConversation] = useState<OpenAI_Messages>([]);

    const [value, setValue] = useState("");

    const [answer, setAnswer] = useState("");

    return (
        <div>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="border"
            />
            <button
                onClick={async () => {
                    const res = await sendMessageToOpenAI([
                        ...conversation,
                        { role: "user", content: value },
                    ]);

                    setConversation((prev) => {
                        return [
                            ...prev,
                            { role: "user", content: value },
                            { role: "assistant", content: res! },
                        ];
                    });

                    setAnswer(res!);
                }}
            >
                Click Me!
            </button>
            <div>
                <ul>
                    {conversation.map((value, idx) => {
                        if (typeof value.content === "string") {
                            return <li key={idx}>{value.content}</li>;
                        }
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Home;
