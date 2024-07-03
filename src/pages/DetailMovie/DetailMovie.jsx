import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function DetailMovie() {
  const {id} = useParams();
  const data = useSelector((state) => state.movie.data);
  const [detailMovie, setDetailMovie] = useState(null);

  useEffect(() => {
    const findMovie = (id) => {
      const movie = data.find((movie) => movie.id === parseInt(id));
      setDetailMovie(movie || null);
    };
    if (data.length > 0) {
      findMovie(id);
    }
  }, [id, data]);

  return (
    <div>
      {detailMovie !== null ? (
        <p>{detailMovie.title}</p>
      ) : (
        <p>Data not found</p>
      )}
    </div>
  );
}

export default DetailMovie;
