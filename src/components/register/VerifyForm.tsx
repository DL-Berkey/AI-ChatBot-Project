"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyOtp } from "@/action/account";

type Props = {
    email: string;
};

const VerifyForm = ({ email }: Props) => {
    const [otpCode, setOtpCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <Card className="mx-auto w-96 mt-28 shadow-main">
            <CardHeader>
                <div className="flex justify-between items-center space-y-0">
                    <p className="text-2xl">회원가입</p>
                    <p className="text-sm text-destructive">{errorMessage}</p>
                </div>
                <CardDescription>
                    회원가입에 사용한 이메일로 인증 메일이 발송되었습니다.{" "}
                    인증을 진행하지 않으면 아이디 찾기 및 비밀번호 변경을 하실
                    수 없습니다.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        if (otpCode === "") return;

                        const result = await verifyOtp(email, otpCode);

                        if (result) {
                            redirect("/");
                        } else {
                            setErrorMessage("인증에 실패했습니다.");
                        }
                    }}
                    className="flex gap-4"
                >
                    <Input
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="인증코드를 입력해주세요"
                    />
                    <Button
                        type="submit"
                        className="text-lg bg-main text-white"
                    >
                        인증
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default VerifyForm;
