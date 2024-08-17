'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Category = ({ c }) => {
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    function toCategories() {
        const params = new URLSearchParams(searchParams);
        params.set('categoryId', c?.id);
        replace(`courses?${params.toString()}`)
    }

    return (
        <div
            onClick={toCategories}
            key={c.id}
            className="bg-[#fafbff] justify-center items-center rounded-[5px] w-[300px] hover:scale-110 ease-linear duration-100 h-[300px] text-center py-5 px-5 border-gray-200 border cursor-pointer hover:border-gray-400 shadow-[#e1ecfe] shadow-lg justify-self-center"
        >
            <p
                className="text-[#00030e] font-[800] text-[28px] my-[5px] leading-[43px]"
            >{c?.title}</p>
            <Image
                className="mx-auto my-auto pt-[10px]"
                src={c?.thumbnail}
                height={200}
                width={200}
                alt="Category thumbnail"
            />
        </div>
    );
};

export default Category;