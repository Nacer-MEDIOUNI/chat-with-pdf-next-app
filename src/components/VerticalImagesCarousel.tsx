import Image from "next/image";
import React, { useEffect, useState } from "react";

type VerticalImagesCarouselProps = {
  images: string[];
};

const VerticalImagesCarousel = ({ images }: VerticalImagesCarouselProps) => {
  // State to track vertical offset for smooth infinite scrolling
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => {
        // Move 0.1% upward each interval
        const step = -0.1;
        return (prevOffset + step) % 100;
      });
    }, 200); // Update every 50ms for smooth animation

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" w-fit h-full overflow-hidden -z-10">
      {/* Container for vertical movement */}
      <div
        className="relative w-full"
        style={{
          transform: `translateY(${offset}%)`,
          transition: "transform 0.5s linear",
        }}
      >
        {/* First set of images */}
        {images.map((src, imgIndex) => (
          <div key={`first-${imgIndex}`} className="my-10">
            <Image
              src={src}
              alt={`Carousel image ${imgIndex}`}
              className="w-full object-cover rounded-lg opacity-30"
              width={200}
              height={200}
            />
          </div>
        ))}

        {/* Duplicate set for seamless looping */}
        {images.map((src, imgIndex) => (
          <div key={`second-${imgIndex}`} className="my-10 ">
            <Image
              src={src}
              alt={`Carousel image ${imgIndex} duplicate`}
              className="w-full object-cover rounded-lg opacity-15 lg:opacity-30 "
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalImagesCarousel;
