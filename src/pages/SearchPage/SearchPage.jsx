import React from "react";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const genres = useSelector((state) => state.categoryMovie.genres);
  console.log(genres);

  return (
    <div>
      <div className="grid grid-cols-8 gap-2">
        {genres.map((genre, index) => (
          <a
            href="#"
            className="bg-indigo-600 px-4 py-3 rounded-lg text-white font-medium flex justify-center items-center text-center"
            key={index}
          >
            {genre.name}
          </a>
        ))}
      </div>

      <div className="divider"></div>
    </div>
  );
};

export default SearchPage;
