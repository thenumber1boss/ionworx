import React, { useState, useEffect } from "react";

const images = [
  "/images/projects/project1.jpeg",
  "/images/projects/project2.jpeg",
  "/images/projects/project3.jpeg",
  "/images/projects/project4.jpg",
  "/images/projects/project5.png",
  "/images/projects/project6.jpeg",
  "/images/projects/project7.jpeg",
  "/images/projects/project8.jpeg",
  "/images/projects/project9.jpeg",
  "/images/projects/project10.jpeg",
];

const GRID_SIZE = 6;
const INTERVAL = 5000;
const OVERLAP_DELAY = 1500;
const FIRST_CYCLE_DELAY = 900;

const LatestProjectsGrid = () => {
  const [visibleImages, setVisibleImages] = useState(images.slice(0, GRID_SIZE));

  useEffect(() => {
    let index = GRID_SIZE;
    const updateImage = (gridIndex: number, delay: number): void => {
      setTimeout(() => {
        setVisibleImages((prevImages: string[]) => {
          const newImages: string[] = [...prevImages];
          newImages[gridIndex] = images[index % images.length];
          return newImages;
        });
        index++;
      }, delay);
    };

    const interval = setInterval(() => {
      for (let i = 0; i < GRID_SIZE; i++) {
        updateImage(i, i === 0 ? FIRST_CYCLE_DELAY : OVERLAP_DELAY * i);
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 p-4 h-[500px]">
        {/* Large Image spanning (Column 1-2, Row 1-2) */}
        <div
          className="col-span-2 row-span-2 bg-cover bg-center rounded-lg transition-all duration-1000 h-full"
          style={{ backgroundImage: `url(${visibleImages[0]})` }}
        ></div>

        {/* Large Image spanning (Column 3, Row 1-2) */}
        <div
          className="col-span-1 row-span-2 bg-cover bg-center rounded-lg transition-all duration-1000 h-full"
          style={{ backgroundImage: `url(${visibleImages[1]})` }}
        ></div>

        {/* Single Image (Column 4, Row 1) */}
        <div
          className="col-span-1 row-span-1 bg-cover bg-center rounded-lg transition-all duration-1000 h-full"
          style={{ backgroundImage: `url(${visibleImages[2]})` }}
        ></div>

        {/* Single Image (Column 4, Row 2) */}
        <div
          className="col-span-1 row-span-1 bg-cover bg-center rounded-lg transition-all duration-1000 h-full"
          style={{ backgroundImage: `url(${visibleImages[3]})` }}
        ></div>
      </div>

      {/* Mobile Grid */}
      <div className="grid grid-cols-2 grid-rows-4 gap-4 p-4 h-[700px] md:hidden">
      {/* Default Layout (Rotated 180 degrees) */}
      {/* Large Image spanning (Column 1-2, Row 1-2) */}
      <div
        className="col-span-2 row-span-2  bg-cover bg-center rounded-lg transition-all duration-1000 h-full"
        style={{ backgroundImage: `url(${visibleImages[0]})` }}
      ></div>

      {/* Single Image (Column 1, Row 3) */}
      <div
        className="col-span-1 row-span-1 bg-cover bg-center rounded-lg transition-all duration-1000 h-full"
        style={{ backgroundImage: `url(${visibleImages[1]})` }}
      ></div>

      {/* Single Image (Column 2, Row 3) */}
      <div
        className="col-span-1 row-span-1 bg-cover bg-center rounded-lg transition-all duration-1000 h-full"
        style={{ backgroundImage: `url(${visibleImages[2]})` }}
      ></div>

      {/* Large Image spanning (Column 1-2, Row 4) */}
      <div
        className="col-span-2 row-span-2 bg-cover bg-center rounded-lg transition-all duration-1000 h-full"
        style={{ backgroundImage: `url(${visibleImages[3]})` }}
      ></div>
    </div>
    </>
  );
};

export default LatestProjectsGrid;
