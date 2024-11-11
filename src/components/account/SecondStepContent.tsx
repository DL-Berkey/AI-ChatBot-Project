import Link from "next/link";
import { HTMLProps } from "react";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = HTMLProps<HTMLDivElement>;

const SecondStepContent = ({ children, className, ...props }: Props) => {
    return (
        <div>
            <div className={cn("mb-10", className)} {...props}>
                {children}
            </div>
            <div className="flex justify-center">
                <Button className="text-lg bg-main text-white" asChild>
                    <Link href="/login">로그인</Link>
                </Button>
            </div>
        </div>
    );
};

export default SecondStepContent;
