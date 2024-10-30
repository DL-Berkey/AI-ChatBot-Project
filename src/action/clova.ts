"use server";

import { revalidatePath } from "next/cache";

type ResponseType = {
    content: {
        data: { details: string; type: string };
    }[];
    event: string;
    timestamp: number;
    userId: string;
    version: "v1";
};

export const sample = async (value: string): Promise<ResponseType> => {
    const res = await fetch(process.env.CLOVA_URL!, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "x-ncp-apigw-zone_cd": "PUBLIC",
            "X-NCP-TRACE-ID": process.env.CLOVA_TRACE_ID!,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: "bebe",
            timestamp: 12345678,
            content: [{ type: "text", data: { details: value } }],
            event: "send",
        }),
    });
    const result = await res.json();

    revalidatePath("/");

    return result;
};
