import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const CompletedList = ({ completedList, removeFromCompletedList }) => {
  return (
    <div className="flex flex-col my-20 w-full">
      <h2 className="text-2xl font-bold text-white mx-5">Completed List</h2>
      {completedList.length === 0 && (
        <p className="text-gray-400 mx-5">No anime in your completed list</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 p-5 w-full">
        {completedList.map((anime) => (
          <div
            key={anime.mal_id}
            className="flex flex-col gap-2 bg-black text-white justify-between relative"
          >
            <img
              src={anime.images.webp.large_image_url}
              alt={anime.title_english}
              className="w-full h-full object-cover"
            />
            <div className="flex flex-col gap-2 justify-between">
              <h1 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {anime.title_english}
              </h1>
              <div className="flex flex-row gap-2 text-gray-400 items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <h2 className="text-sm">{anime.type}</h2>
                  <h2 className="text-sm">&bull;</h2>
                  <h2 className="text-sm">{anime.duration}</h2>
                  <h2 className="text-sm">&bull;</h2>
                  <div className="bg-green-300 text-black rounded-lg px-2 py-1">
                    <h2 className="text-sm">{anime.episodes}</h2>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => removeFromCompletedList(anime)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CompletedList;
