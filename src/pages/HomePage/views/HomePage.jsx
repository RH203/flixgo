import {useEffect, useState} from "react";
import {Buttons, CardMovie} from "../../../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryMovie} from "../../../redux/slice/categoryMovieSlice";
import {imageMovie, movieGenreUrl, trendingMovieListUrl, tvSeriesUrl,} from "../../../constant/constant";
import {getData} from "../../../controller/controller";
import {setDataPopular, setDataTvSeries} from "../../../redux/slice/homepageSlice.js";
import {setDataDetail} from "../../../redux/slice/detailSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();


  // Movie
  const movieData = useSelector((state) => state.homepage.dataPopular)
  const [valueMovie, setValueMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Tv series
  const [tvData, setTvData] = useState([])
  const tvValue = useSelector((state) => state.homepage.dataTvSeries)
  const [tvIsLoading, setTvIsLoading] = useState(false);



  useEffect(() => {
    const getCategoryMovie = async () => {
      try {
        const fetchedData = await getData(movieGenreUrl, "genres");
        dispatch(setCategoryMovie(fetchedData));
      } catch (error) {
        console.error("Error fetching data [CATEGORY]:", error);
      }
    };

    if(sessionStorage.getItem("user")) {

    }


    getTrendingMovie();
    getCategoryMovie();
    getTvSeries();
  }, [dispatch]);

  const getTrendingMovie = async (category = "movie", time = "day") => {

    try {
      setValueMovie(category);
      setIsLoading(true);

      const fetchedData = await getData(
        trendingMovieListUrl + category + "/" + time,
        "results",
      );
      dispatch(setDataPopular(fetchedData))
      // console.log(fetchedData)
    } catch (error) {
      console.error("Error fetching data [MOVIE]:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getTvSeries = async (category = "airing_today") => {
    try {
      setTvIsLoading(true);
      const fetchedData = await getData(tvSeriesUrl + category, "results")
      dispatch(setDataTvSeries(fetchedData))
      // setTvData(fetchedData)
      // console.log(`getTvSeries for category: ${fetchedData}`);
    } catch (error) {
      console.error("Error fetching data [TV_SERIES]:", error);
      setTvIsLoading(false);
    } finally {
      setTvIsLoading(false)
    }
  }

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
          <div
            className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <Buttons
              title={"Get started"}
              link={""}
              style={
                "px-7 py-4 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto font-semibold hover:bg-gray-500 hover:text-white "
              }
            />
            <Buttons
              title={"Try it out"}
              link={""}
              style={
                "px-7 py-4 w-full bg-indigo-600 hover:bg-indigo-400 text-gray-200 text-center rounded-md block sm:w-auto font-semibold "
              }
            />
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3 xs:hidden sm:hidden md:hidden lg:block">
          <img src="/banner/banner1.svg" alt={"Image not found"} className="w-full lg:w-full"/>
        </div>
      </section>
      {/* Banner end */}


      {/* Movie Trending start */}
      <div className="space-y-10 mt-10">

        {/* Header Movie start*/}
        <div>
          <div className="flex justify-between">

            <div className="flex">
              <p className="text-gray-800 font-semibold text-2xl">
                Popular right now
              </p>
            </div>

            <Buttons
              title={"More"}
              link={"popular"}
              style={
                "text-gray-600 font-semibold text-2xl cursor-pointer underline"
              }
            />
          </div>


          <div className="flex w-full items-center mt-2">
            <div className="join shadow-lg">
              <input className="join-item btn" type="radio" name="options" aria-label="Movie"
                     onClick={() => getTrendingMovie("movie")}/>
              <input className="join-item btn" type="radio" name="options" aria-label="TV"
                     onClick={() => getTrendingMovie("tv")}/>
              <input className="join-item btn" type="radio" name="options" aria-label="People"
                     onClick={() => getTrendingMovie("person")}/>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="join shadow-lg">
              <input className="join-item btn" type="radio" name="options" aria-label="Today"
                     onClick={() => getTrendingMovie(valueMovie, "day")}/>

              <input className="join-item btn" type="radio" name="options" aria-label="This week"
                     onClick={() => getTrendingMovie(valueMovie, "week")}/>
            </div>
          </div>
        </div>
        {/* Header Movie End*/}

        <div className={`grid-rows-1 ${isLoading ? "block h-20" : "grid"}`}>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-bars loading-lg "></span>
            </div>
          ) : (
            <div className="mt-2 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 gap-2">
              <>
                {isLoading ? (
                  <div className="skeleton"></div>
                ) : (
                  Array.isArray(movieData) && movieData.length > 0 ? (
                    movieData.slice(0, 6).map((movie) => (
                      <div key={movie.id} onClick={() => dispatch(setDataDetail(movie))}>
                        <CardMovie
                          title={movie.title || movie.name}
                          image={imageMovie + (movie.poster_path || movie.profile_path)}
                          rating={Math.round(movie.vote_average)}
                          link={`detail-movie/${movie.id}`}
                        />
                      </div>

                    ))
                  ) : (
                    <p className="text-gray-400">No data available.</p>
                  )
                )}
              </>
            </div>

          )}
        </div>
      </div>
      {/* Movie Trending end */}

      {/* TV Series list start*/}
      <div className={"my-28 space-y-10"}>

        {/* Header TV Series list start*/}
        <div>
          <div className="flex justify-between">
            <div className="flex">
              <p className="text-gray-800 font-semibold text-2xl">
                TV Series
              </p>
            </div>

            <Buttons
              title={"More"}
              link={"#"}
              style={
                "text-gray-600 font-semibold text-2xl cursor-pointer underline"
              }
            />
          </div>

          <div className="join shadow-lg mt-2">
            <input className="join-item btn" type="radio" name="options" aria-label="Airing today"
                   onClick={() => getTvSeries("airing_today")}/>
            <input className="join-item btn" type="radio" name="options" aria-label="On the air"
                   onClick={() => getTvSeries("on_the_air")}/>
            <input className="join-item btn" type="radio" name="options" aria-label="Popular tv series"
                   onClick={() => getTvSeries("popular")}/>
            <input className="join-item btn" type="radio" name="options" aria-label="Top rated"
                   onClick={() => getTvSeries("top_rated")}/>
          </div>

        </div>
        {/* Header TV Series list start*/}

        {/* Main TV Series list start*/}
        <div>
          <div className={`grid-rows-1 ${tvIsLoading ? "block h-20" : "grid"}`}>
            {tvIsLoading ? (
              <div className="flex justify-center items-center h-full">
                <span className="loading loading-bars loading-lg "></span>
              </div>
            ) : (
              <div className="mt-2 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 gap-2">
                <>
                  {tvIsLoading ? (
                    <div className="skeleton"></div>
                  ) : (
                    Array.isArray(tvValue) && tvValue.length > 0 ? (
                      tvValue.slice(0, 6).map((movie) => (
                        <div key={movie.id} onClick={() => dispatch(setDataDetail(movie))}>
                          <CardMovie
                            title={movie.title || movie.name}
                            image={imageMovie + (movie.poster_path || movie.profile_path)}
                            rating={Math.round(movie.vote_average)}
                            link={`detail-movie/${movie.id}`}
                          />
                        </div>

                      ))
                    ) : (
                      <p className="text-gray-400">No data available.</p>
                    )
                  )}
                </>
              </div>

            )}
          </div>
        </div>
        {/* Main TV Series list End*/}

      </div>
      {/* TV Series list end*/}

    </div>


  );
};

export default HomePage;
