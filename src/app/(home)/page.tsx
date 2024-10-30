"use client";

import { useState } from "react";

import { sample } from "@/action/clova";

const Home = () => {
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
                    const res = await sample(value);
                    console.groupCollapsed("🚀 ~", res);

                    setAnswer(res.content[0].data.details);
                }}
            >
                Click Me!
            </button>
            <div>대답: {answer}</div>
        </div>
    );
};

export default Home;
