import ConversationRoomContainer from "@/components/home/ConversationRoomContainer";

type Props = {
    searchParams: Promise<{
        page: number;
    }>;
};

const Home = async ({ searchParams }: Props) => {
    const page = Number((await searchParams).page);

    return (
        <main className="mt-10">
            <ConversationRoomContainer currentPage={page} />
        </main>
    );
};

export default Home;
