import { redirect } from "next/navigation";

import { LayoutGrid } from "lucide-react";

import { OpenAI_Messages } from "@/types";
import ConversationRoom from "./ConversationRoom";
import RoomPagination from "./RoomPagination";

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
    // 화면에 렌더링 되는 page의 갯수
    const pageCount = 5;

    // 화면에 렌더링 되는 page들의 첫번째 페이지
    const startPage = pageCount * Math.floor((currentPage - 1) / pageCount) + 1;

    // 가장 마지막 페이지
    const lastPage = TempData.length;

    const prevPage = Math.max(1, currentPage - 1);
    const nextPage = Math.min(lastPage, currentPage + 1);

    // page가 NAN 이거나 lastPage보다 크면 1페이지로 리다이렉트
    if (isNaN(currentPage) || currentPage > lastPage) redirect("/?page=1");

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
            <RoomPagination
                paginationData={{
                    pageCount,
                    startPage,
                    currentPage,
                    prevPage,
                    nextPage,
                    lastPage,
                }}
            />
        </section>
    );
};

export default ConversationRoomContainer;
