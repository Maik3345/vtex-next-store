"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

export const Carousel = (props: {
  slides: { alt: string; href: string; image: string }[];
}) => {
  const { slides } = props ?? {};
  return (
    <>
      <Swiper
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        style={{ maxWidth: 1700, margin: "0 auto" }}
      >
        {slides.map((slide) => (
          <SwiperSlide>
            <Image
              src={slide.image}
              alt={slide.alt}
              width={1700}
              height={495}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
