import Link from "next/link";

import { Button } from "../ui/button";

import ThemeButton from "./ThemeButton";

const Header = () => {
    return (
        <header className="flex items-center justify-between my-4">
            <div className="text-4xl">
                <Link href="/">
                    <span>0</span>
                    <span className="text-main">10</span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <ThemeButton />
                <Button className="bg-main text-white font-semibold text-sm p-2">
                    <Link href="/">로그인</Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;
