"use client"

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchCourse = () => {
    const [searchTerms, setSearchTerms] = useState('');
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const SearchInput = (e) => {
        setSearchTerms(e.target.value);
    }

    const doSearch = () => {
        const params = new URLSearchParams(searchParams);

        if (searchTerms.trim() === '') {
            params.delete('course');
        } else {
            params.set('course', searchTerms);
        }

        replace(`courses?${params.toString()}`);
    }

    return (
        <form className="relative h-10 w-[50%] mx-auto">
            <Search
                onClick={doSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
            <Input
                onChange={SearchInput}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        doSearch();
                    }
                }}
                type="text"
                placeholder="Search courses..."
                className="pl-8 pr-3 py-2 text-sm"
            />
        </form>
    )
}

export default SearchCourse