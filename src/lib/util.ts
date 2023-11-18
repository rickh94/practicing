import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type SpotStage } from "./validators/library";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePagination(currentPage: number, totalPages: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export function uniqueID() {
  return `${Math.floor(Math.random() * Math.random() * Date.now())}`;
}

export const siteTitle = "Practice Better";

export function getStageDisplayName(stage: SpotStage) {
  switch (stage) {
    case "repeat":
      return "Repeat Practice";
    case "random":
      return "Random Practice";
    case "interleave":
      return "Interleaved Practice";
    case "interleave_days":
      return "Interleave Between Days";
    case "completed":
      return "Completed";
    default:
      return "Unknown";
  }
}
