"use client";

import Link from "next/link";

import { Button } from "../ui/button";

import { logout } from "@/action/account";

const LogoutButton = () => {
    return (
        <Button
            className="p-2 text-sm font-semibold text-white bg-main"
            onClick={() => logout()}
        >
            로그아웃
        </Button>
    );
};

export default LogoutButton;
