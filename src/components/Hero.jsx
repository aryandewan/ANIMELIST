import React, { useState, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import Trending from "./Trending.jsx";
import Loading from "./Loading.jsx";

const Hero = ({
  topTenAnime,
  addToWatchList,
  addToCompletedList,
  addToWatchingList,
}) => {
  if (!topTenAnime.length) {
    console.warn("topTenAnime is empty or undefined");
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  const [isXL, setIsXL] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsXL(window.innerWidth >= 768); // Tailwind's "xl" breakpoint is 1280px
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const title = topTenAnime[0].title_english;

  const watchNow = () => {
    window.open(
      "https://hianime.to/solo-leveling-season-2-arise-from-the-shadow-19413",
      "_blank"
    );
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div className="relative w-full h-3/4 md:h-[80%] xl:h-[70%] xl:ml-50">
        <div
          className={`absolute w-full h-full ${
            isXL ? "mask-image-right" : ""
          } xl:ml-50`}
        >
          <div className="w-full h-full mask-image-bottom">
            <img
              src="images/solo.webp"
              alt={title}
              className="h-full object-cover mask-image opacity-[0.5] xl:opacity-100"
            />
          </div>
        </div>
        <div className="absolute bottom-0 md:bottom-10 w-full max-sm:h-1/2 mask-image-left xl:-ml-50 overflow-hidden left-5">
          <h1 className="text-white text-2xl font-bold mb-5 lg:text-7xl w-1/2">
            {title}
          </h1>

          <p className="text-white text-[1rem] w-1/2 xl:w-1/3 hidden xl:block mb-5">
            Sung Jin-Woo, dubbed the weakest hunter of all mankind, grows
            stronger by the day with the supernatural powers he has gained.
            However, keeping his skills hidden becomes more difficult as
            dungeon-related incidents pile up around him.
          </p>

          <div className="flex flex-row gap-4">
            <button
              className="bg-[#8b2abf] text-white md:font-semibold text-sm p-2 lg:text-2xl lg:p-4 rounded-full hover:bg-[#45155e] transition-all duration-200"
              onClick={watchNow}
            >
              Watch Now
            </button>
            <button
              onClick={() => addToWatchList(topTenAnime[0])}
              className="border-2 border-white text-xl p-2 lg:text-3xl text-white lg:p-4 rounded-full hover:bg-white hover:text-black transition-all duration-200"
            >
              <TiPlus />
            </button>
          </div>
        </div>
      </div>
      <Trending
        topTenAnime={topTenAnime}
        addToWatchList={addToWatchList}
        addToCompletedList={addToCompletedList}
        addToWatchingList={addToWatchingList}
      />
    </div>
  );
};

export default Hero;
