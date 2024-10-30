"use client";

import { useTheme } from "next-themes";

import { Button } from "../ui/button";

import { Moon, Sun } from "lucide-react";

const ThemeButton = () => {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <>
            {/* 모바일 화면에서의 UI */}
            <Button
                onClick={() =>
                    setTheme(() =>
                        resolvedTheme === "light" ? "dark" : "light"
                    )
                }
                className="inline p-1 ml-auto scale-90 md:hidden"
            >
                {resolvedTheme === "light" ? (
                    <Sun className="text-orange-600" />
                ) : (
                    <Moon className="text-yellow-400" />
                )}
            </Button>

            {/* 모바일 화면이 아닐 때의 UI */}
            <label
                htmlFor="switch"
                className="relative items-center justify-between hidden w-12 h-6 bg-gray-200 rounded shadow-inner dark:bg-gray-500 md:flex hover:cursor-pointer"
            >
                <input
                    defaultChecked={resolvedTheme === "dark"}
                    type="checkbox"
                    id="switch"
                    onChange={() =>
                        setTheme(() =>
                            resolvedTheme === "light" ? "dark" : "light"
                        )
                    }
                    className="sr-only peer"
                />
                <Sun className="text-orange-600 scale-75" />
                <Moon className="text-yellow-400 scale-75" />
                <span className="absolute w-1/2 h-full transition-all duration-500 translate-x-full -translate-y-1/2 bg-main rounded peer-checked:translate-x-0 top-1/2"></span>
            </label>
        </>
    );
};

export default ThemeButton;
