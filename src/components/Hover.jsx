import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

const Hover = ({
  anime,
  addToWatchList,
  addToWatchingList,
  addToCompletedList,
}) => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="bg-black/50 text-white p-4 flex flex-row gap-2 justify-between h-full w-full items-center">
        <button
          onClick={() => addToWatchList(anime)}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
        >
          <FaHeart />
        </button>
        <button
          onClick={() => addToWatchingList(anime)}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
        >
          <FaPlay />
        </button>
        <button
          onClick={() => addToCompletedList(anime)}
          className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center"
        >
          <FaCheck />
        </button>
      </div>
    </div>
  );
};
export default Hover;
