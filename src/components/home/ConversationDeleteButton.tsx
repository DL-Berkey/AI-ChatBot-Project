import { Button } from "../ui/button";

import { X } from "lucide-react";

import { deleteConversationRoom } from "@/action/conversationRoom";
import ConversationContainer from "../conversation/ConversationContainer";
import Home from "@/app/(home)/page";

type Props = {
    room_id: string;
};

const ConversationDeleteButton = ({ room_id }: Props) => {
    return (
        <Button
            onClick={(e) => {
                e.stopPropagation();

                const isDelete = window.confirm(
                    "삭제하시겠습니까? \n채팅방을 삭제하면 되돌릴 수 없습니다."
                );

                if (isDelete) {
                    deleteConversationRoom(room_id);
                }
            }}
            className="absolute top-0 right-0 p-0 px-2 text-main"
        >
            <X className="scale-125" />
        </Button>
    );
};

export default ConversationDeleteButton;
