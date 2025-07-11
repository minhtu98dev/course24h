"use client";

import { useState, useEffect, useRef } from "react";
import { Slide } from "@/data/slide";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SliderProps = {
  slides: Slide[];
};

export default function Slider({ slides }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const SLIDE_INTERVAL = 5000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      SLIDE_INTERVAL
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, slides.length]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl md:h-80 lg:h-96">
      <div
        className="h-full w-full whitespace-nowrap transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative inline-block h-full w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
              <div className="max-w-md sm:max-w-xl md:max-w-2xl">
                <h2 className="whitespace-normal text-2xl font-bold sm:text-3xl md:text-5xl">
                  {slide.title}
                </h2>
                <p className="mt-2 whitespace-normal text-sm md:text-lg">
                  {slide.description}
                </p>
              </div>

              <Link
                href={slide.buttonLink}
                className="mt-4 rounded-full bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-lg transition-transform hover:scale-105 md:mt-6 md:px-8 md:py-3 md:text-base animate-pulse"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-1 text-white transition hover:bg-white/50 md:left-4 md:p-2"
      >
        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-1 text-white transition hover:bg-white/50 md:right-4 md:p-2"
      >
        <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
      </button>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === slideIndex
                ? "h-2 w-6 bg-white"
                : "h-2 w-2 bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
