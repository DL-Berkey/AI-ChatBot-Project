"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import { login, register } from "@/action/account";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
    id: z.string().min(6, "아이디는 최소 6글자 이상입니다."),
    password: z.string().min(6, "비밀번호는 최소 6글자 이상입니다."),
});

const LoginForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            password: "",
        },
    });

    const formState = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await login(values);

        if (result) {
            router.replace("/");
        } else {
            form.setError("root", {
                message: "아이디 또는 비밀번호가 일치하지 않습니다.",
            });
        }
    };

    return (
        <Card className="mx-auto w-96 mt-28 shadow-main">
            <CardHeader className="flex-row justify-between items-center space-y-0">
                <p className="text-2xl">로그인</p>
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
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {formState.errors.id
                                            ? formState.errors.id.message
                                            : "아이디"}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="아이디"
                                            className="dark:focus:border-main dark:focus-visible:boder-main"
                                            {...field}
                                        />
                                    </FormControl>
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
                                            type="password"
                                            placeholder="비밀번호"
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
                                    "로그인"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="text-gray-400 justify-center gap-1">
                <Button className="hover:text-main">
                    <Link href="/register">회원가입</Link>
                </Button>
                <Button className="hover:text-main">
                    아이디 찾기 / 비밀번호 변경
                </Button>
            </CardFooter>
        </Card>
    );
};

export default LoginForm;
