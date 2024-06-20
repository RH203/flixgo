import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { imageMovie, trendingMovieList } from "../../constant/constant";
import { getData } from "../../controller/controller";
import { ToastContainer, toast, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const PopularRightNow = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [valueMovie, setValueMovie] = useState("");
  const genres = useSelector((state) => state.categoryMovie.genres);

  const notify = () =>
    toast.info("Page doesn't exist!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    getTrendingMovie();
  }, [currentPage]);

  const getTrendingMovie = async (category = "movie") => {
    try {
      console.log("getTrendingMovie");
      setValueMovie(category);
      setIsLoading(true);

      const fetchedData = await getData(
        trendingMovieList + category + "/day",
        "results",
        currentPage,
      );
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data [MOVIE]:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementCurrentPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const decrementCurrentPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 1) {
      notify();
    } else {
      setCurrentPage(prevPage);
    }
  };

  const renderGenres = (genreIds) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id))
      .filter((genre) => genre !== undefined)
      .map((genre, index) => <span key={index}>{genre.name}</span>);
  };

  return (
    <div className="">
      <ToastContainer position="top-center" theme="light" />

      <div className="">
        {isLoading ? (
          <p>Loading...</p>
        ) : Array.isArray(data) && data.length > 0 ? (
          <div className="grid grid-rows-1 gap-3">
            {data.map((movie, index) => (
              <div
                className="grid grid-cols-2 gap-2 hover:bg-gray-300 cursor-pointer"
                key={index}
              >
                <img
                  src={imageMovie + movie.poster_path}
                  alt="Movie Poster"
                  className="col-end-1"
                />
                <div className="">
                  <p>{movie.title}</p>
                  <p>{movie.original_language}</p>
                  <p>{renderGenres(movie.genre_ids)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>No data found</p>
          </div>
        )}
      </div>

      <div className="join flex justify-center items-center">
        <button
          className="join-item btn btn-outline btn-primary"
          onClick={() => {
            decrementCurrentPage();
            getTrendingMovie();
          }}
        >
          «
        </button>
        <button className="join-item btn btn-outline btn-primary">
          Page {currentPage}
        </button>
        <button
          className="join-item btn btn-outline btn-primary"
          onClick={() => {
            incrementCurrentPage();
            getTrendingMovie();
          }}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default PopularRightNow;
