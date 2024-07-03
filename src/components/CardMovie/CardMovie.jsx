import React from "react";


import propTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const CardMovie = ({ image, title, link, rating }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full rounded-xl shadow-xl pb-3" onClick={() => navigate(link)}>
      <figure className="w-full">
        <img
          src={image}
          alt="Image not found"
          className="rounded-xl xs:w-full sm:w-full"
        />
      </figure>
      <div className="pl-2 mt-1">
        <h2 className="font-semibold text-lg text-gray-600">{title}</h2>
      </div>
    </div>
  );
};

CardMovie.propTypes = {
  image: propTypes.string,
  title: propTypes.string,
  link: propTypes.string,
  rating: propTypes.number,
};

export default CardMovie;
