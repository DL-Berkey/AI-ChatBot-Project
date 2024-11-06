import ConversationContainer from "@/components/conversation/ConversationContainer";
import { getConversationList } from "@/action/conversation";

type Props = {
    params: Promise<{
        roomId: string;
    }>;
};

const page = async ({ params }: Props) => {
    const { roomId: encodedRoomId } = await params;
    const roomId = atob(encodedRoomId);

    const conversationList = await getConversationList(roomId);

    return (
        <ConversationContainer
            messageData={{
                roomId: roomId,
                conversationList: conversationList,
            }}
        />
    );
};

export default page;
