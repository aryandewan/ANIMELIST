import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hover from "./Hover";

gsap.registerPlugin(ScrollTrigger);

const Trending = ({
  topTenAnime,
  addToWatchList,
  addToWatchingList,
  addToCompletedList,
}) => {
  const [isHovering, setIsHovering] = useState(null);

  return (
    <div className="flex flex-col w-full h-1/2 md:h-1/3">
      <div className="ml-5">
        <h1 className="text-3xl font-semibold text-white xl:mb-5">Trending</h1>
      </div>
      <div className="flex flex-row w-full h-full overflow-x-auto overflow-y-hidden">
        {topTenAnime.map((anime, index) => (
          <div
            key={anime.mal_id}
            className="flex flex-col w-[250px] xl:w-[200px] shrink-0 h-full relative"
            onMouseEnter={() => setIsHovering(anime)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="flex flex-row w-full h-[10%] items-center justify-between gap-5 px-5 py-1 overflow-hidden">
              <span className="text-white text-lg font-medium">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
              <h1 className="text-white text-lg font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                {anime.title_english}
              </h1>
            </div>
            <div className="flex flex-col h-[90%]">
              <img
                src={anime.images.webp.large_image_url}
                alt={anime.title_english}
                className="h-full object-cover p-5"
              />
            </div>
            {isHovering?.mal_id === anime.mal_id && (
              <div className="absolute top-0 left-0 w-full h-full">
                <Hover
                  anime={anime}
                  addToWatchList={addToWatchList}
                  addToWatchingList={addToWatchingList}
                  addToCompletedList={addToCompletedList}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Trending;
