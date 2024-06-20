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
      transition: Bounce,
    });

  useEffect(() => {
    getTrendingMovie();
  }, []);

  const getTrendingMovie = async (category = "movie") => {
    try {
      setValueMovie(category);
      setIsLoading(true);

      const fetchedData = await getData(
        trendingMovieList + category + "/day",
        "results",
        currentPage,
      );
      // console.log(`Data: ${JSON.stringify(fetchedData)}`);
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data [MOVIE]:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const incrementCurrentPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getTrendingMovie();
  };

  const decrementCurrentPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage <= 1) {
      notify();
      setCurrentPage(1);
    } else {
      setCurrentPage(prevPage);
      getTrendingMovie();
    }
  };

  return (
    <div className="">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />

      <div className="">
        {Array.isArray(data) && data.length > 0 ? (
          <div className="grid grid-rows-1 gap-3">
            {data.map((movie, index) => (
              <div
                className="grid grid-cols-2 gap-2 hover:bg-gray-300"
                key={index}
              >
                <img
                  src={imageMovie + movie.poster_path}
                  alt="Movie Poster"
                  className="col-end-1"
                />
                <div className="">
                  <p className="">{movie.title}</p>
                  <p className="">{movie.original_language}</p>
                  <p></p>
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

      <div className="divider"></div>

      <div className="join flex justify-center items-center">
        <button
          className="join-item btn btn-outline btn-primary"
          onClick={decrementCurrentPage}
        >
          «
        </button>
        <button className="join-item btn btn-outline btn-primary">
          Page {currentPage}
        </button>
        <button
          className="join-item btn btn-outline btn-primary"
          onClick={incrementCurrentPage}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default PopularRightNow;
