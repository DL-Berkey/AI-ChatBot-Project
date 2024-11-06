import Link from "next/link";

import { Button } from "../ui/button";

import { getUserData } from "@/action/account";
import ThemeButton from "./ThemeButton";
import LogoutButton from "./LogoutButton";

const Header = async () => {
    const userData = await getUserData();

    return (
        <header className="max-md:sticky max-md:top-0 max-md:px-7 max-md:z-50 dark:bg-background max-md:w-full flex items-center justify-between my-4 max-md:h-[10%] max-md:my-0 bg-white">
            <div className="text-4xl">
                <Link href="/">
                    <span>0</span>
                    <span className="text-main">10</span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <ThemeButton />
                {userData ? (
                    <LogoutButton />
                ) : (
                    <Button className="p-2 text-sm font-semibold text-white bg-main">
                        <Link href="/login">로그인</Link>
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;
