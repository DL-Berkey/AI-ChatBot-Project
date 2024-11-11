"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

import { LoaderCircle } from "lucide-react";

import { sendPasswordChangingLink } from "@/action/account";
import SecondStepContent from "./SecondStepContent";

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

const ChangePasswordTabcard = () => {
    const [nextStep, setNextStep] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: "",
            email: "",
        },
    });

    const formState = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const url = window.location.origin;

        const result = await sendPasswordChangingLink({
            redirectURL: url,
            nickname: values.nickname,
            email: values.email,
        });

        if (result) {
            setNextStep(true);
        } else {
            form.setError("root", {
                message: "존재하지 않는 유저입니다.",
            });
        }
    };

    return (
        <Card>
            <CardHeader className="flex-row justify-between items-center space-y-0">
                <p className="text-2xl">비밀번호 변경</p>
                <p className="text-sm text-destructive">
                    {formState.errors && formState.errors.root?.message}
                </p>
            </CardHeader>
            <CardContent className="space-y-2">
                {nextStep ? (
                    <SecondStepContent>
                        회원가입 시 입력한 이메일로 비밀번호 변경 링크를 포함한
                        메일을 전송했습니다. <br />
                        이메일함을 확인해주세요.
                    </SecondStepContent>
                ) : (
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
                                        "비밀번호 변경"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </CardContent>
        </Card>
    );
};

export default ChangePasswordTabcard;
