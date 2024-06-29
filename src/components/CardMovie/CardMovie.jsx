import React from "react";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import propTypes from "prop-types";

const CardMovie = ({ image, title, link, rating }) => {
  return (
    <Link to={link} className="w-full rounded-xl shadow-xl pb-3">
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
    </Link>
  );
};

CardMovie.propTypes = {
  image: propTypes.string,
  title: propTypes.string,
  link: propTypes.string,
  rating: propTypes.number,
};

export default CardMovie;
