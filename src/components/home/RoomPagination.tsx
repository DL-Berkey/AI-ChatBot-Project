import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { cn } from "@/lib/utils";

type Props = {
    paginationData: {
        pageCount: number;
        startPage: number;
        currentPage: number;
        prevPage: number;
        nextPage: number;
        lastPage: number;
    };
};

const getPageQueryString = (page: number) => {
    return `?page=${page}`;
};

const RoomPagination = ({ paginationData }: Props) => {
    const { pageCount, startPage, currentPage, prevPage, nextPage, lastPage } =
        paginationData;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={getPageQueryString(prevPage)} />
                </PaginationItem>
                {Array(pageCount)
                    .fill(undefined)
                    .map((_, idx) => {
                        const page = idx + startPage;

                        const isActive = Number(currentPage) === page;

                        if (page > lastPage) return;

                        return (
                            <PaginationItem key={idx}>
                                <PaginationLink
                                    href={getPageQueryString(page)}
                                    isActive={isActive}
                                    className={cn(isActive && "text-main")}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                <PaginationItem>
                    <PaginationNext href={getPageQueryString(nextPage)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default RoomPagination;
