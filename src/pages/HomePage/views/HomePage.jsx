import { useEffect, useState } from "react";
import { Buttons } from "../../../components";
import { getCategoryMovie } from "../controller/homepage";

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getCategoryMovie();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          <img src="/banner/banner1.svg" className="w-full  lg:w-full" />
        </div>
      </section>
      {/* Banner end */}

      {/* Movie genre start */}
      <div className="space-y-10">
        <div className="flex justify-between">
          <p className="text-gray-800 font-semibold text-2xl">Genre movie</p>
          <Buttons
            title={"More"}
            link={""}
            style={
              "text-gray-600 font-semibold text-2xl cursor-pointer underline"
            }
          />
        </div>

        <div className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 gap-1">
          {Array.isArray(data) && data.length > 0 ? (
            data.slice(0, 8).map((genre, index) => (
              <a
                href="#"
                className="bg-indigo-600 px-4 py-3 rounded-lg text-white font-medium flex justify-center items-center text-center"
                key={index}
              >
                {genre.name}
              </a>
            ))
          ) : (
            <p className="text-gray-400">No genres available.</p>
          )}
        </div>
      </div>
      {/* Movie genre end */}

      {/* Movie Trending start */}
      <div className=""></div>
      {/* Movie Trending end */}
    </div>
  );
};

export default HomePage;