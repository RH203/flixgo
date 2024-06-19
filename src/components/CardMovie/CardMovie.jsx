import React from "react";
import { Link } from "react-router-dom";

const CardMovie = ({ image, title, desc, link }) => {
  return (
    <div className=" w-full shadow-xl">
      <figure className="w-full">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className=" items-center text-center text-gray-800 mt-1">
        <h2 className=" font-semibold">{title}</h2>
        {/* <p>{desc}</p> */}
        <div className="">
          <Link to={link} className="">
            More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
