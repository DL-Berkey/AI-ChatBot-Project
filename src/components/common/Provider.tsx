"use client";

import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

const Provider = ({ children, ...props }: ThemeProviderProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        mounted && (
            <NextThemesProvider {...props}>{children}</NextThemesProvider>
        )
    );
};

export default Provider;
