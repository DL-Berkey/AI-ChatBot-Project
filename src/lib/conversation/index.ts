import { Conversation, ConversationList } from "@/types";
import { getFormattedTime } from "../utils";

const sessionStorageKey = btoa("guest-conversation");

const greetingMessage =
    "게스트 채팅방에 오신걸 환영합니다! \n " +
    "이곳에서 자유롭게 무엇이든 물어보세요! \n" +
    "로그인을 하시면 대화내용의 저장과 새로운 대화방을 만들 수도 있습니다. \n " +
    "현재 아래와 같은 기능이 구현되어있습니다. \n " +
    "##### - SMTP를 사용한 이메일 인증 \n " +
    "##### - 회원가입 / 로그인 / 아이디 찾기 / 비밀번호 변경 \n " +
    "##### - 채팅방 만들기 / 채팅방 삭제 \n " +
    "##### - 익명으로 대화하기 \n " +
    "##### - 반응형 디자인 \n " +
    "##### - 다크모드";

export const getConversationListFromSession: () => ConversationList = () => {
    const data = sessionStorage.getItem(sessionStorageKey);

    if (!data)
        return [
            {
                id: 0,
                role: "assistant",
                content: greetingMessage,
                created_at: getFormattedTime("now"),
            },
        ];

    return JSON.parse(data);
};

export const addConversationToSession = (conversation: Conversation) => {
    const conversationList = getConversationListFromSession();

    sessionStorage.setItem(
        sessionStorageKey,
        JSON.stringify([...conversationList, conversation])
    );
};
