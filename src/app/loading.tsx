import { LoaderCircle } from "lucide-react";

const Loading = () => {
    return (
        <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoaderCircle className="animate-spin size-28 text-main" />
        </main>
    );
};

export default Loading;
