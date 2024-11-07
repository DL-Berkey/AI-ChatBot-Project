"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

import { LoaderCircle } from "lucide-react";

import {
    changePassword,
    checkEmail,
    checkId,
    isExistingUser,
} from "@/action/account";

const formSchema = z
    .object({
        nickname: z
            .string()
            .min(3, "닉네임은 최소 3글자 이상입니다.")
            .regex(
                /^[a-zA-Z0-9]+$/,
                "닉네임에는 영문자 및 숫자만 사용할 수 있습니다."
            ),
        email: z.string().email("이메일을 입력해주세요."),
        password: z.string().min(6, "비밀번호는 최소 6글자 이상입니다."),
        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
    });

const ChangePasswordTabcard = () => {
    const [isExisting, setIsExisting] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const formState = form.formState;

    const checkValue = async () => {
        const isValidEmail = await form.trigger("email");
        const isValidNickname = await form.trigger("nickname");

        if (!isValidEmail || !isValidNickname) return;

        // const result = await checkEmail(form.getValues("email"));

        const result = await isExistingUser(
            form.getValues("nickname"),
            form.getValues("email")
        );

        if (!result) {
            form.setError("nickname", {
                message: "존재하지 않는 유저입니다.",
            });
        } else {
            setIsExisting(true);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // const result = await register(values);
        // if (result) {
        //     router.replace("/register/notice");
        // } else {
        //     form.setError("root", {
        //         message: "알 수 없는 이유로 회원가입에 실패했습니다.",
        //     });
        // }

        const result = await changePassword(values);

        if (result) {
            // router.replace("/register/notice");
        } else {
            form.setError("root", {
                message: "알 수 없는 이유로 변경에 실패했습니다.",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>비밀번호 변경</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
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
                                            ? formState.errors.nickname.message
                                            : "닉네임"}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            maxLength={10}
                                            placeholder="닉네임"
                                            disabled={isExisting}
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
                                    <div className="flex gap-2">
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="이메일"
                                                disabled={isExisting}
                                                className="dark:focus:border-main dark:focus-visible:boder-main"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            disabled={isExisting}
                                            onClick={() => checkValue()}
                                        >
                                            {isExisting
                                                ? "인증 완료"
                                                : "유저 확인"}
                                        </Button>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {formState.errors.password
                                            ? formState.errors.password.message
                                            : "새로운 비밀번호"}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            maxLength={12}
                                            type="password"
                                            placeholder="비밀번호"
                                            className="dark:focus:border-main dark:focus-visible:boder-main"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {formState.errors.passwordConfirm
                                            ? formState.errors.passwordConfirm
                                                  .message
                                            : "비밀번호 확인"}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            maxLength={12}
                                            type="password"
                                            placeholder="비밀번호 확인"
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
            </CardContent>
        </Card>
    );
};

export default ChangePasswordTabcard;
