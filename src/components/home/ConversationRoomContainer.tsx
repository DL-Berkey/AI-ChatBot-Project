import { redirect } from "next/navigation";

import { LayoutGrid } from "lucide-react";

import ConversationRoom from "./ConversationRoom";
import RoomPagination from "./RoomPagination";
import { getConversationRoomList } from "@/action/conversationRoom";
import NewChatButton from "./NewChatButton";

type Props = {
    currentPage: number;
};

const ConversationRoomContainer = async ({ currentPage }: Props) => {
    const { roomList, count } = await getConversationRoomList(currentPage);

    // 화면에 렌더링 되는 page의 갯수
    const pageCount = 5;

    // 화면에 렌더링 되는 page들의 첫번째 페이지
    const startPage = pageCount * Math.floor((currentPage - 1) / pageCount) + 1;

    // 가장 마지막 페이지
    const lastPage = Math.ceil(count / 9);

    const prevPage = Math.max(1, currentPage - 1);
    const nextPage = Math.min(lastPage, currentPage + 1);

    // page가 NAN 이거나 lastPage보다 크면 1페이지로 리다이렉트
    if ((isNaN(currentPage) || currentPage > lastPage) && currentPage !== 1)
        redirect("/?page=1");

    return (
        <section className="space-y-5">
            <div className="relative">
                <h2 className="flex items-center gap-2 text-2xl">
                    <LayoutGrid className="text-main" />
                    대화방
                </h2>
                <NewChatButton className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
            </div>
            {lastPage !== 0 ? (
                <>
                    <div
                        className={
                            "px-4 space-y-5 md:space-y-0 md:h-[43rem] md:grid md:grid-cols-3 md:grid-rows-3 md:gap-6"
                        }
                    >
                        {roomList.slice(0, 9).map((data) => {
                            return (
                                <ConversationRoom
                                    key={data.id}
                                    roomData={data}
                                />
                            );
                        })}
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
                </>
            ) : (
                <div className="grid place-items-center h-[43rem]">
                    <p className="text-2xl">
                        <span className="text-3xl font-semibold text-main">
                            +
                        </span>
                        를 눌러 새로운 대화를 시작해보세요!
                    </p>
                </div>
            )}
        </section>
    );
};

export default ConversationRoomContainer;
