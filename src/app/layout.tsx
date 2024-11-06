import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Provider from "@/components/common/Provider";
import Header from "@/components/header/Header";

const pretendard = localFont({
    src: "./fonts/Pretendard-Regular.woff2",
});

export const metadata: Metadata = {
    title: "10 Project",
    description: "10 Project",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="ko">
            <body
                className={`${pretendard.className} max-md:w-full w-5/6 mx-auto 2xl:w-3/6 text-semi_black`}
            >
                <Provider attribute="class" defaultTheme="system" enableSystem>
                    <Header />
                    {children}
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
