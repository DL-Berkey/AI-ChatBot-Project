import dayjs from "dayjs";

import { Conversation, ConversationList } from "@/types";
import { getFormattedTime } from "../utils";

export const getConversationListFromSession: () => ConversationList = () => {
    const data = sessionStorage.getItem("guest-conversation");

    if (!data)
        return [
            {
                id: 0,
                role: "assistant",
                content:
                    "게스트 채팅방에 오신걸 환영합니다! \n이곳에서 자유롭게 무엇이든 물어보세요! \n로그인을 하시면 대화내용의 저장과 새로운 대화방을 만들 수도 있습니다.",
                created_at: getFormattedTime("now"),
            },
        ];

    return JSON.parse(data);
};

export const addConversationToSession = (conversation: Conversation) => {
    const conversationList = getConversationListFromSession();

    sessionStorage.setItem(
        "guest-conversation",
        JSON.stringify([...conversationList, conversation])
    );
};
