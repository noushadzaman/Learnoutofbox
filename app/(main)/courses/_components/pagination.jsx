'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CoursePagination({ count, defaultPage }) {
    const [page, setPage] = useState(defaultPage || 1);
    const pagesArray = Array(Math.ceil(count / 9)).fill(0).map((_, index) => index + 1);
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    const params = new URLSearchParams(searchParams);

    function nextPage(page) {
        if (page >= (pagesArray.length + 1)) {
            return
        }
        params.set('page', page);
        setPage(page);
        replace(`/courses?${params.toString()}`);
    }

    function toPage(page) {
        params.set('page', page);
        setPage(page);
        replace(`/courses?${params.toString()}`);
    }

    function previousPage(page) {
        if (page <= 0) {
            params.delete('page');
            return
        }
        params.set('page', page);
        setPage(page);
        replace(`/courses?${params.toString()}`);
    }


    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => previousPage(Number(page) - 1)}
                    />
                </PaginationItem>
                {pagesArray.map((page) => (
                    <PaginationItem
                        key={page}
                        onClick={() => toPage(page)}
                    >
                        <PaginationLink>{page}</PaginationLink>
                    </PaginationItem>
                ))}
                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => nextPage(Number(page) + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}