import { useEffect, useState } from "react";
import { Buttons, CardMovie } from "../../../components";

import { useDispatch, useSelector } from "react-redux";
import { setCategoryMovie } from "../../../redux/slice/categoryMovieSlice";

import {
  imageMovie,
  movieGenre,
  trendingMovieList,
} from "../../../constant/constant";
import { getData } from "../../../controller/controller";

const HomePage = () => {
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState([]);
  const [valueMovie, setValueMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const genres = useSelector((state) => state.categoryMovie.genres);
  console.log(genres)

  const buttonTrending = [
    { title: "Movie", value: "movie", click: "" },
    { title: "Tv", value: "tv", click: "" },
  ];

  useEffect(() => {
    const getCategoryMovie = async () => {
      try {
        console.log("getCategoryMovie")
        const fetchedData = await getData(movieGenre, "genres");
        dispatch(setCategoryMovie(fetchedData));
      } catch (error) {
        console.error("Error fetching data [CATEGORY]:", error);
      }
    };

    getTrendingMovie();
    getCategoryMovie();
  }, [dispatch]);

  const getTrendingMovie = async (category = "movie") => {
    try {
      setValueMovie(category);
      setIsLoading(true);

      const fetchedData = await getData(
        trendingMovieList + category + "/day",
        "results",
      );
      setMovieData(fetchedData);
    } catch (error) {
      console.error("Error fetching data [MOVIE]:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-poppins">
      {/* Banner start */}
      <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl">
            Your Ultimate Destination for Streaming Movies
            <span className="text-indigo-400"> FlixGo </span>
          </h1>
          <p className="text-gray-400 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            Discover, Stream, and Enjoy Unlimited Movies Anytime,
            Anywhere—experience the ultimate in movie streaming with FlixGo.
            Enjoy unlimited access to a diverse collection of films, tailored to
            suit every mood
          </p>
          <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <Buttons
              title={"Get started"}
              link={""}
              style={
                "px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto font-semibold hover:bg-gray-500 hover:text-white transition duration-500"
              }
            />
            <Buttons
              title={"Try it out"}
              link={""}
              style={
                "px-7 py-3 w-full bg-indigo-600 text-gray-200 text-center rounded-md block sm:w-auto font-semibold "
              }
            />
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3 xs:hidden sm:hidden md:hidden lg:block">
          <img src="/banner/banner1.svg" className="w-full lg:w-full" />
        </div>
      </section>
      {/* Banner end */}

      {/* Movie genre start */}
      <div className="space-y-10">
        <div className="flex justify-between">
          <p className="text-gray-800 font-semibold text-2xl">Genre movie</p>
          <Buttons
            title={"More"}
            link={"search"}
            style={
              "text-gray-600 font-semibold text-2xl cursor-pointer underline"
            }
          />
        </div>

        <div className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2  gap-1">
          {genres.slice(0, 8).map((genre, index) => (
            <a
              href="#"
              className="bg-indigo-600 px-4 py-3 rounded-lg text-white font-medium flex justify-center items-center text-center"
              key={index}
            >
              {genre.name}
            </a>
          ))}
        </div>
      </div>
      {/* Movie genre end */}

      {/* Movie Trending start */}
      <div className="space-y-10 mt-10">
        <div className="flex justify-between">
          <div className="flex sm:w-1/2 xs:1/2">
            <p className="text-gray-800 font-semibold text-2xl">
              Popular right now
            </p>

            <div className="dropdown dropdown-bottom">
              <div
                tabIndex={0}
                role="button"
                className="bg-indigo-600 px-2 py-1 rounded-lg text-gray-200 m-1"
              >
                Movie
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  {buttonTrending.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => getTrendingMovie(button.value)}
                    >
                      {button.title}
                    </button>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          <Buttons
            title={"More"}
            link={"popular"}
            style={
              "text-gray-600 font-semibold text-2xl cursor-pointer underline"
            }
          />
        </div>

        <div className="grid grid-rows-1">
          {isLoading ? (
            <div className="mx-auto">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            <div className="mt-2 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 gap-2">
              <>
                {Array.isArray(movieData) && movieData.length > 0 ? (
                  movieData
                    .slice(0, 6)
                    .map((movie, index) => (
                      <CardMovie
                        key={index}
                        title={valueMovie !== "tv" ? movie.title : movie.name}
                        image={imageMovie + movie.poster_path}
                        rating={Math.round(movie.vote_average)}
                        link={""}
                      />
                    ))
                ) : (
                  <p className="text-gray-400">No data available.</p>
                )}
              </>
            </div>
          )}
        </div>
      </div>
      {/* Movie Trending end */}
    </div>
  );
};

export default HomePage;
