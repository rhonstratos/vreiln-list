import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const dateFormat = (date?: string, formatString = "MMM D, YYYY") => {
    if (!date) return null;

    return moment(date).format(formatString);
};
