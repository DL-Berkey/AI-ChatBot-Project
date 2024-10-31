import { LayoutGrid } from "lucide-react";

import { OpenAI_Messages } from "@/types";
import ConversationRoom from "./ConversationRoom";

const TempData: {
    roomName: string;
    lastConversationContent: OpenAI_Messages;
    lastConversationTime: string;
}[] = [
    {
        roomName: "첫번째 룸",
        lastConversationContent: [
            { role: "assistant", content: "대화 내용 내용" },
            { role: "user", content: "대화 내용 내용" },
            { role: "assistant", content: "대화 내용 내용" },
        ],
        lastConversationTime: "2024-09-09",
    },
    {
        roomName: "두번째 룸",
        lastConversationContent: [
            { role: "assistant", content: "대화 내용 내용" },
            { role: "user", content: "대화 내용 내용" },
            { role: "assistant", content: "대화 내용 내용" },
        ],
        lastConversationTime: "2024-09-09",
    },
    {
        roomName: "세번째 룸",
        lastConversationContent: [
            { role: "assistant", content: "대화 내용 내용" },
            { role: "user", content: "대화 내용 내용" },
            { role: "assistant", content: "대화 내용 내용" },
        ],
        lastConversationTime: "2024-09-09",
    },
    {
        roomName: "네번째 룸",
        lastConversationContent: [
            { role: "assistant", content: "대화 내용 내용" },
            { role: "user", content: "대화 내용 내용" },
            { role: "assistant", content: "대화 내용 내용" },
        ],
        lastConversationTime: "2024-09-09",
    },
    {
        roomName: "다섯번째 룸",
        lastConversationContent: [
            { role: "assistant", content: "대화 내용 내용" },
            { role: "user", content: "대화 내용 내용" },
            { role: "assistant", content: "대화 내용 내용" },
        ],
        lastConversationTime: "2024-09-09",
    },
    {
        roomName: "첫번째 룸",
        lastConversationContent: [
            { role: "assistant", content: "대화 내용 내용" },
            { role: "user", content: "대화 내용 내용" },
            { role: "assistant", content: "대화 내용 내용" },
        ],
        lastConversationTime: "2024-09-09",
    },
    {
        roomName: "두번째 룸",
        lastConversationContent: [
            { role: "assistant", content: "대화 내용 내용" },
            { role: "user", content: "대화 내용 내용" },
            { role: "assistant", content: "대화 내용 내용" },
        ],
        lastConversationTime: "2024-09-09",
    },
    {
        roomName: "세번째 룸",
        lastConversationContent: [
            { role: "assistant", content: "대화 내용 내용" },
            { role: "user", content: "대화 내용 내용" },
            { role: "assistant", content: "대화 내용 내용" },
        ],
        lastConversationTime: "2024-09-09",
    },
    {
        roomName:
            "네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸 네번째 룸",
        lastConversationContent: [
            { role: "assistant", content: "대화 내용 내용" },
            {
                role: "user",
                content:
                    "대화 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용",
            },
            {
                role: "assistant",
                content:
                    "대화 내용 내용 대화내용내용 대화 내용 내용 대화 내용 내용 대화 내용 내용 대화 내용 내용 대화 내용 내용 대화 내용 내용 대화 내용 내용",
            },
        ],
        lastConversationTime: "2024-09-09",
    },
];

type Props = {
    currentPage: number;
};

const ConversationRoomContainer = ({ currentPage }: Props) => {
    return (
        <section className="space-y-5">
            <h2 className="flex items-center gap-2 text-2xl">
                <LayoutGrid className="text-main" />
                대화방
            </h2>
            <div className="grid grid-cols-3 gap-6 px-4">
                {TempData.map((data, idx) => (
                    <ConversationRoom key={idx} roomData={data} />
                ))}
            </div>
        </section>
    );
};

export default ConversationRoomContainer;
