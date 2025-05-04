import { usePagination } from "@/hooks/use-pagination";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationProps {
  page: number;
  limit: number;
  totalItems: number;
}

export function PaginationComponent({
  page,
  limit,
  totalItems,
}: PaginationProps) {
  const { pages, total, isCurrentPage } = usePagination({
    page,
    limit,
    totalItems,
  });

  return (
    <Pagination className="mt-10 flex flex-row gap-2">
      <PaginationItem>
        <PaginationPrevious
          href={`?page=${page - 1}#posts`}
          className={`${page === 1 ? "hidden" : ""}`}
        />
      </PaginationItem>
      {pages.map((item, index) => {
        const isCurrent = isCurrentPage(Number(item));

        return (
          <PaginationItem
            key={index}
            className={`${
              isCurrent && typeof item === "number"
                ? " bg-black hover:bg-black hover:text-white text-white font-extrabold"
                : "flex flex-col justify-end items-center "
            } rounded-md text-xl`}
          >
            {typeof item === "number" ? (
              <PaginationLink
                href={`?page=${item}`}
                className={`${
                  typeof item === "number"
                    ? "hover:bg-black hover:text-white font-bold text-sm"
                    : ""
                }`}
              >
                {item}
              </PaginationLink>
            ) : (
              <span className="h-9 w-9 text-xl text-center">{item}</span>
            )}
          </PaginationItem>
        );
      })}

      <PaginationItem>
        <PaginationNext
          href={`?page=${page + 1}#posts`}
          className={`${page === total ? "hidden" : ""}`}
        />
      </PaginationItem>
    </Pagination>
  );
}
