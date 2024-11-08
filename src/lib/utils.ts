import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const getFormattedTime = (time: string) => {
    const data = dayjs(time);

    if (data.isValid()) {
        return data.format("YYYY년 M월 D일 H시 m분");
    } else {
        dayjs().format("YYYY년 M월 D일 H시 m분");
    }
};
