"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
const SORT_OPTIONS = [
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
];


const SortCategories = ({ categories }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleValueChange = (value) => {
        const params = new URLSearchParams(searchParams);
        params.set('categoryId', value);
        replace(`courses?${params.toString()}`);
    };

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px] !border-b focus:ring-0 focus:ring-offset-0  overflow-hidden bg-[#f5f5f5]">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {categories.map((c) => (
                        <SelectItem
                            className="cursor-pointer"
                            key={c?.id}
                            value={c?.id}
                            onSelect={() => handleSelect(c?.id)}
                        >
                            {c?.title}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
};

export default SortCategories;