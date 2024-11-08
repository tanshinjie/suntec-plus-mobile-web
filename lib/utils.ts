import { placeholderImage } from "@/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BROKEN_LINKS = [
  "https://platform-public-suntec-prod.s3.ap-southeast-1.amazonaws.com/merchant_logo/NA",
  "https://platform-public-suntec-prod.s3.ap-southeast-1.amazonaws.com/merchant_logo/null",
];
export function fallbackUrl(url: string) {
  if (BROKEN_LINKS.includes(url)) {
    return placeholderImage;
  }
  return url;
}
