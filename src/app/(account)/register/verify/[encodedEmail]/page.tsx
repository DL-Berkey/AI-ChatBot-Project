import { decode } from "url-safe-base64";

import VerifyForm from "@/components/register/VerifyForm";

type Props = {
    params: Promise<{
        encodedEmail: string;
    }>;
};

const page = async ({ params }: Props) => {
    const { encodedEmail: encodedRoomId } = await params;
    const email = decode(atob(encodedRoomId)).replace(/dot/g, ".");

    return <VerifyForm email={email} />;
};

export default page;
