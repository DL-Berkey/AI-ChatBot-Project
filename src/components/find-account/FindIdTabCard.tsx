"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

import { LoaderCircle } from "lucide-react";

import { isExistingUser } from "@/action/account";

const formSchema = z.object({
    nickname: z
        .string()
        .min(3, "닉네임은 최소 3글자 이상입니다.")
        .regex(
            /^[a-zA-Z0-9]+$/,
            "닉네임에는 영문자 및 숫자만 사용할 수 있습니다."
        ),
    email: z.string().email("이메일을 입력해주세요."),
});

const FindIdTabCard = () => {
    const [accountId, setAccountId] = useState<string | null>(null);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: "",
            email: "",
        },
    });

    const formState = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const isValidEmail = await form.trigger("email");
        const isValidNickname = await form.trigger("nickname");

        if (!isValidEmail || !isValidNickname) return;

        const result = await isExistingUser(values.nickname, values.email);

        if (!result) {
            form.setError("nickname", {
                message: "존재하지 않는 유저입니다.",
            });
        } else {
            setAccountId(result.account_id);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>아이디 찾기</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {accountId === null ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="nickname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {formState.errors.nickname
                                                ? formState.errors.nickname
                                                      .message
                                                : "닉네임"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                maxLength={10}
                                                placeholder="닉네임"
                                                className="dark:focus:border-main dark:focus-visible:boder-main"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {formState.errors.email
                                                ? formState.errors.email.message
                                                : "이메일"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="이메일"
                                                className="dark:focus:border-main dark:focus-visible:boder-main"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    className="text-lg bg-main text-white"
                                    disabled={formState.isSubmitting}
                                >
                                    {formState.isSubmitting ? (
                                        <LoaderCircle className="animate-spin" />
                                    ) : (
                                        "아이디 찾기"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <>
                        <div className="text-center mb-10">
                            <span>{`${form.getValues(
                                "nickname"
                            )}님의 아이디는 `}</span>
                            <span className="text-main font-semibold">
                                {accountId}
                            </span>
                            <span>입니다.</span>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                className="text-lg bg-main text-white"
                                asChild
                            >
                                <Link href="/login">로그인으로 가기</Link>
                            </Button>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default FindIdTabCard;
