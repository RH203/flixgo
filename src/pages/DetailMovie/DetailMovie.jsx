import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {imageMovie} from "../../constant/constant.js";
import {hasFlag} from "country-flag-icons";
import {convertIso} from "../../controller/controller.js";
import {increment, setDataCart} from "../../redux/slice/cartSlice.js";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DetailMovie() {
  const dispatch = useDispatch();
  const {id} = useParams();

  const cart = useSelector((state) => state.cart.data);
  const data = useSelector((state) => state.movie.data);
  const popularData = useSelector((state) => state.homepage.dataPopular)
  const tvSeries = useSelector((state) => state.homepage.dataTvSeries)
  const genres = useSelector((state) => state.categoryMovie.genres) || [];

  const [detailMovie, setDetailMovie] = useState(null);

  useEffect(() => {
    const findMovie = () => {
      let movie = data.find((movie) => movie.id === parseInt(id));
      if (!movie && popularData) {
        movie = popularData.find((movie) => movie.id === parseInt(id));
      }
      if (!movie && tvSeries) {
        movie = tvSeries.find((movie) => movie.id === parseInt(id));
      }
      setDetailMovie(movie || null);
    };

    if (data.length > 0 || popularData || tvSeries) {
      findMovie();
    }
  }, [id, data, popularData, tvSeries]);

  const notify = () =>
    toast.info("Oops movie already exist!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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

  const addToCart = () => {
    const item = cart.find((movie) => movie.id === detailMovie.id)
    if (item === undefined) {
      dispatch(setDataCart(detailMovie))
      dispatch(increment())
    } else {
      notify()
    }
  }

  return (
    <div className={"w-full"}>
      <ToastContainer position="top-center" theme="light"/>
      {detailMovie !== null ? (
        <div className={"grid grid-cols-3 gap-3"}>
          <img src={imageMovie + (detailMovie.poster_path || detailMovie.profile_path)}
               alt={detailMovie.title || detailMovie.name} className={"col-end-1 rounded-lg"}/>

          <div className={"col-span-2 flex flex-col justify-between"}>

            <div>
              <p className={"font-medium text-xl flex items-center gap-3 "}>
                {detailMovie.title || detailMovie.name}
                <div>
                  {hasFlag(convertIso(detailMovie.original_language)) ? (
                    <img
                      alt="Country Flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${convertIso(detailMovie.original_language)}.svg`}
                      className={"size-5"}
                    />
                  ) : (
                    <p>No icon</p>
                  )}
                </div>
              </p>
              <p className={"text-sm"}>{detailMovie.release_date}</p>
              <p className={"text-sm mt-5"}>{detailMovie.overview}</p>
            </div>


            <div className={"flex items-center justify-between"}>
              <div className={"grid grid-cols-2 w-1/2 gap-2"}>
                {renderGenres(detailMovie.genre_ids)}
              </div>
              <div className="radial-progress text-indigo-400 "
                   style={{"--value": (detailMovie.vote_average * 1000) / 100}}
                   role="progressbar">
                {(detailMovie.vote_average * 1000) / 100}%
              </div>
            </div>
          </div>

        </div>
      ) : (
        <p>Data not found</p>
      )}
      <button type="submit" className={"btn bg-indigo-600 text-white hover:bg-indigo-400 mt-10"} onClick={addToCart}>Add
        to
        favorite
      </button>

    </div>
  );
}

export default DetailMovie;
