"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader } from "../ui/card";

import { LoaderCircle } from "lucide-react";

import { checkEmail, checkId, register } from "@/action/account";

const formSchema = z
    .object({
        nickname: z.string().min(3, "닉네임은 최소 3글자 이상입니다."),
        email: z.string().email("이메일을 입력해주세요."),
        id: z.string().min(6, "아이디는 최소 6글자 이상입니다."),
        password: z.string().min(6, "비밀번호는 최소 6글자 이상입니다."),
        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
    });

const RegisterForm = () => {
    const [isAvailable, setIsAvailable] = useState({
        email: false,
        id: false,
    });

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: "",
            email: "",
            id: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const formState = form.formState;

    const checkValue = async (valueType: "email" | "id") => {
        const messageKeyword = valueType === "email" ? "이메일" : "아이디";

        const triggerResult = await form.trigger(valueType);

        if (!triggerResult) return;

        let result = null;

        if (valueType === "email") {
            result = await checkEmail(form.getValues("email"));
        } else {
            result = await checkId(form.getValues("id"));
        }

        if (!result) {
            form.setError(valueType, {
                message: `사용할 수 없는 ${messageKeyword}입니다.`,
            });
        } else {
            setIsAvailable((prev) => {
                const newValue = {
                    ...prev,
                };

                newValue[valueType] = true;

                return newValue;
            });
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await register(values);

        if (result) {
            router.replace("/register/notice");
        } else {
            form.setError("root", {
                message: "알 수 없는 이유로 회원가입에 실패했습니다.",
            });
        }
    };

    return (
        <Card className="mx-auto w-96 mt-28 shadow-main">
            <CardHeader className="flex-row justify-between items-center space-y-0">
                <p className="text-2xl">회원가입</p>
                <p className="text-sm text-destructive">
                    {formState.errors && formState.errors.root?.message}
                </p>
            </CardHeader>
            <CardContent>
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
                                                disabled={isAvailable.email}
                                                className="dark:focus:border-main dark:focus-visible:boder-main"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            disabled={isAvailable.email}
                                            onClick={() => checkValue("email")}
                                        >
                                            {isAvailable.email
                                                ? "사용 가능"
                                                : "중복 확인"}
                                        </Button>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {formState.errors.id
                                            ? formState.errors.id.message
                                            : "아이디"}
                                    </FormLabel>
                                    <div className="flex gap-2">
                                        <FormControl>
                                            <Input
                                                maxLength={9}
                                                placeholder="아이디"
                                                disabled={isAvailable.id}
                                                className="dark:focus:border-main dark:focus-visible:boder-main"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            disabled={isAvailable.id}
                                            onClick={() => checkValue("id")}
                                        >
                                            {isAvailable.id
                                                ? "사용 가능"
                                                : "중복 확인"}
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
                                            : "비밀번호"}
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
                                    "회원가입"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default RegisterForm;
