import React, { useState, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import Hover from "./Hover";

const Search = ({
  anime,
  addToWatchList,
  addToCompletedList,
  addToWatchingList,
}) => {
  const [isHovering, setIsHovering] = useState(null);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 w-full p-5 mt-15">
      {anime.map((anime) => (
        <div
          key={anime.mal_id}
          className="flex flex-col gap-2 bg-black text-white m-4 justify-between relative"
          onMouseEnter={() => setIsHovering(anime)}
          onMouseLeave={() => setIsHovering(null)}
        >
          <img src={anime.images.webp.large_image_url} alt={anime.title} />
          <div className="flex flex-col gap-2 justify-between">
            <h1 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              {anime.title_english}
            </h1>
            <div className="flex flex-row gap-2 text-gray-400 items-center">
              <h2 className="text-sm">{anime.type}</h2>
              <h2 className="text-sm">&bull;</h2>
              <h2 className="text-sm">{anime.duration}</h2>
              <h2 className="text-sm">&bull;</h2>
              <div className="bg-green-300 text-black rounded-lg px-2 py-1">
                <h2 className="text-sm">{anime.episodes}</h2>
              </div>
            </div>
          </div>
          {isHovering?.mal_id === anime.mal_id && (
            <div className="absolute top-0 left-0 w-full h-full">
              <Hover
                anime={anime}
                addToWatchList={addToWatchList}
                addToCompletedList={addToCompletedList}
                addToWatchingList={addToWatchingList}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Search;
