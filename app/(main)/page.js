import Banner from "@/components/home/banner";
import Features from "@/components/home/features";
import PopularCourses from "@/components/home/popular-courses";
import BannerTwo from "@/components/home/banner-two";
import HomeTestimonials from "@/components/home/testimonials";
import React from "react";
import { Info } from "@/components/home/info";
import Categories from "@/components/home/categories";
import DelayDiv from "@/components/home/DelayDiv";

const HomePage = async () => {
  return (
    <>
      <Banner />
      <DelayDiv>
        <Features />
      </DelayDiv>
      <DelayDiv>
        <PopularCourses />
      </DelayDiv>
      <DelayDiv>
        <Categories />
      </DelayDiv>
      <DelayDiv>
        <BannerTwo />
      </DelayDiv>
      <DelayDiv>
        <HomeTestimonials />
      </DelayDiv>
      <DelayDiv>
        <Info />
      </DelayDiv>
    </>
  );
};

export default HomePage;
