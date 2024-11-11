"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { LoaderCircle } from "lucide-react";

import { changePassword } from "@/action/account";

const formSchema = z
    .object({
        password: z.string().min(6, "비밀번호는 최소 6글자 이상입니다."),
        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
    });

const ChangePasswordForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            passwordConfirm: "",
        },
    });

    const formState = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await changePassword(values.password);

        if (result) {
            router.replace("/");
        } else {
            form.setError("root", {
                message: "알 수 없는 이유로 변경에 실패했습니다.",
            });
        }
    };

    return (
        <Card className="w-full mx-auto min-[520px]:w-96 mt-28 shadow-main">
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

export default ChangePasswordForm;
