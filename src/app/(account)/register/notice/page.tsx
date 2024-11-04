import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

const page = () => {
    return (
        <Card className="mx-auto w-96 mt-28 shadow-main">
            <CardHeader className="text-2xl">알림</CardHeader>
            <CardContent className="text-sm">
                회원가입에 사용한 이메일로 인증 메일이 발송되었습니다. <br />
                인증을 진행하지 않으면 아이디 찾기 및 비밀번호 변경을 하실 수
                없습니다.
            </CardContent>
            <CardFooter className="justify-center">
                <Button className="text-lg bg-main text-white" asChild>
                    <Link href="/">확인</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default page;
