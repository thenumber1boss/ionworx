import React, { useState } from "react";
import { FormatQuote, Star, StarHalf, StarOutline } from "@mui/icons-material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const testimonials = [
  {
    name: "Robert Akanji",
    text: "Everything about this company was top-notch, from design to installation, including the reserve battery pack.",
    ratings: 4.0,
  },
  {
    name: "Marcus Ugochuckwu",
    text: "The team was professional, and the installation process was seamless. Highly recommend their services!",
    ratings: 5.0,
  },
  {
    name: "Sarah Okafor",
    text: "Great experience! The solar panels are working perfectly, and the battery backup is a game-changer.",
    ratings: 4.5,
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="text-white text-[20px] lg:text-[30px]" />
        ))}
        {hasHalfStar && (
          <StarHalf className="text-white text-[20px] lg:text-[30px]" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutline key={`empty-${i}`} className="text-white text-[20px] lg:text-[30px]" />
        ))}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col items-center py-[40px] lg:py-[120px]">
      <div className="w-full flex flex-col items-center gap-[20px]">
        <h2 className="text-[var(--text-light)] dark:text-[var(--text-dark)] font-[700] text-[24px] lg:text-[48px] leading-[1.2] lg:leading-[1.1]">
          Testimonials
        </h2>
        <p className="text-[#848484] font-[400] text-[12px] lg:text-[16px] leading-[1.5] lg:leading-[1.6]">
          Easy Process, Better Technology, Happy Customers
        </p>
      </div>
      <div className="bg-[#315B8D] text-white rounded-[8px] text-center w-full py-[40px] lg:py-[100px] mt-[40px] lg:mt-[100px]">
        {/* Testimonial Card */}
        <div className="max-w-[600px] mx-auto p-6 flex flex-col items-center gap-[20px]">
          <div className="flex flex-col items-center gap-[10px]">
            <div className="flex justify-center mb-2">
              {renderStars(testimonials[currentIndex].ratings)}
            </div>
            <p className="font-normal text-[12px] lg:text-[16px]">
              {testimonials[currentIndex].name}
            </p>
          </div>
          <p className="flex justify-center text-lg">
            <FormatQuote className="mr-2 rotate-180 text-[40px] lg:text-[67px]" />
            {testimonials[currentIndex].text}
            <FormatQuote className="ml-2 self-end text-[40px] lg:text-[67px] mt-[-15px]" />
          </p>
        </div>
      </div>

      {/* Navigation Arrows and Dots */}
      <div className="flex justify-center items-center mt-[20px] lg:mt-[50px] gap-4">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-400 transition"
        >
          <ArrowBackIos className="text-gray-700" fontSize="small" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`cursor-pointer rounded-full transition-all ${
                currentIndex === index
                  ? "w-6 h-2 bg-blue-700"
                  : "w-2 h-2 bg-gray-400"
              }`}
            ></div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-400 transition"
        >
          <ArrowForwardIos className="text-gray-700" fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;