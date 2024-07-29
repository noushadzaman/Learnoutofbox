'use client';

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function TestimonialCarousel({ reviews }) {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="mx-auto w-[90%] md:w-[65%] lg:w-[75%]"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {
                    reviews.map(review => <CarouselItem key={review.id}>
                        <div className="p-1">
                            <Card className="h-[auto] py-[40px] md:h-[400px] rounded-[5px] bg-[#fef8f8] border-none shadow-none">
                                <CardContent className="flex flex-col md:flex-row items-center gap-7 justify-center h-full">
                                    <div className="max-w-[80%] lg:max-w-[50%]">
                                        <p
                                            className="text-[#606060] text-[18px]"
                                        >{review.review}</p>
                                        <div className="mt-[20px]">
                                            <p
                                                className="text-[#FE4A55] text-[24px] font-[700]"
                                            >{review.name}</p>
                                            <p
                                                className="text-[#606060] text-[15px]"
                                            >{review.designation}</p>
                                        </div>
                                    </div>
                                    <Image
                                        className="rounded-full object-cover h-[200px] w-[200px]"
                                        src={review.profilePicture}
                                        alt={review.name}
                                        height={300}
                                        width={300}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>)
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

