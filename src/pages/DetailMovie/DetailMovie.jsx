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
  const genres = useSelector((state) => state.categoryMovie.genres) || [];
  const detail = useSelector((state) => state.detail.data)


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id, detail]);

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
        <span className={"bg-indigo-400 font-medium py-1 rounded-lg text-[0.7rem] text-center"} key={index}>
          {`${genre.name}`}
        </span>
      ));
  };

  const addToCart = () => {
    const item = cart.find((movie) => movie.id === detail.id)
    if (item === undefined) {
      dispatch(setDataCart(detail))
      dispatch(increment())
    } else {
      notify()
    }
  }

  return (
    <div className={"w-full"}>
      <ToastContainer position="top-center" theme="light"/>
      {detail !== null ? (
        <div className={"grid grid-cols-3 gap-3"}>
          <img src={imageMovie + (detail.poster_path || detail.profile_path)}
               alt={detail.title || detail.name} className={"col-end-1 rounded-lg"}/>

          <div className={"col-span-2 flex flex-col justify-between"}>

            <div>
              <p className={"font-medium text-xl flex items-center gap-3 "}>
                {detail.title || detail.name}
                <div>
                  {hasFlag(convertIso(detail.original_language)) ? (
                    <img
                      alt="Country Flag"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${convertIso(detail.original_language)}.svg`}
                      className={"size-5"}
                    />
                  ) : (
                    <p>No icon</p>
                  )}
                </div>
              </p>
              <p className={"text-sm"}>{detail.release_date}</p>
              <p className={"text-sm mt-5"}>{detail.overview}</p>
            </div>


            <div className={"flex items-center justify-between"}>
              <div className={"grid grid-cols-4 w-2/3 gap-2"}>
                {renderGenres(detail.genre_ids)}
              </div>
              <div className="radial-progress text-indigo-400 "
                   style={{"--value": (detail.vote_average * 1000) / 100}}
                   role="progressbar">
                {(detail.vote_average * 1000) / 100}%
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
