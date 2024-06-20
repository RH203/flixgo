import React from "react";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import propTypes from "prop-types";

const CardMovie = ({ image, title, link, rating }) => {
  return (
    <Link to={link} className=" w-full shadow-xl rounded-xl">
      <figure className="w-full">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl xs:w-full sm:w-full"
        />
      </figure>
      <div className="pl-2 mt-1 space-y-5">
        <h2 className="font-semibold text-lg text-gray-600">{title}</h2>
        <div className="flex items-center gap-1">
          <p className="font-semibold text-lg text-gray-400"> {rating}</p>
          <IoStar />
        </div>
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
