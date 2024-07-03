import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {imageMovie, trendingMovieListUrl} from "../../constant/constant";
import {convertIso, getData} from "../../controller/controller";
import {toast, ToastContainer} from "react-toastify";
import {TfiAngleDoubleLeft, TfiAngleDoubleRight} from "react-icons/tfi";
import {hasFlag} from 'country-flag-icons';
import {useNavigate} from "react-router-dom";


import "react-toastify/dist/ReactToastify.css";
import {setMovie} from "../../redux/slice/movieSlice.js";

const PopularRightNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [valueMovie, setValueMovie] = useState("");

  const genres = useSelector((state) => state.categoryMovie.genres) || [];
  const data = useSelector((state) => state.movie.data) || [];


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
        `${trendingMovieListUrl}${category}/day`,
        "results",
        currentPage,
      );

      dispatch(setMovie(fetchedData));
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
    if (!genreIds) return null;
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id))
      .filter((genre) => genre !== undefined)
      .map((genre, index) => (
        <span className={"bg-indigo-400 py-1 rounded-lg text-sm text-center"} key={index}>
          {`${genre.name}`}
        </span>
      ));
  };

  return (
    <div className="">
      <ToastContainer position="top-center" theme="light"/>

      <div className="">
        {isLoading ? (
          <span className="loading loading-bars loading-lg"></span>
        ) : Array.isArray(data) && data.length > 0 ? (
          <div className="w-full grid grid-cols-2 gap-3">
            {data.map((movie, index) => (
              <div
                className="grid grid-cols-3 rounded-lg gap-2 hover:bg-gray-300 cursor-pointer"
                key={index}
                onClick={() => navigate(`/detail-movie/${movie.id}`)}
              >
                <img
                  src={imageMovie + movie.poster_path}
                  alt="Movie Poster"
                  className="col-end-1 rounded-lg"
                />
                <div className="col-span-2">
                  <div className={"grid grid-rows-4"}>
                    <p className={"text-lg font-semibold flex items-center gap-2"}>
                      {movie.title}
                      <div>
                        {hasFlag(convertIso(movie.original_language)) ? (
                          <img
                            alt="Country Flag"
                            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${convertIso(movie.original_language)}.svg`}
                            className={"size-5"}
                          />
                        ) : (
                          <p>No icon</p>
                        )}
                      </div>
                    </p>
                    <div className={"max-w-screen-xs grid grid-cols-2 gap-1"}>
                      {renderGenres(movie.genre_ids)}
                    </div>
                    <p className={""}>{movie.release_date}</p>
                  </div>
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

      <div className="join flex justify-center items-center mt-10">
        <button
          className="join-item btn btn-outline"
          onClick={() => {
            decrementCurrentPage();
            getTrendingMovie();
          }}
        >
          <TfiAngleDoubleLeft/>
        </button>
        <button className="join-item btn btn-outline">
          Page {currentPage}
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() => {
            incrementCurrentPage();
            getTrendingMovie();
          }}
        >
          <TfiAngleDoubleRight/>
        </button>
      </div>
    </div>
  );
};

export default PopularRightNow;
