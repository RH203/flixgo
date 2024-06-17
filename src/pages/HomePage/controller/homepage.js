import axios from "axios";
import { movieGenre } from "../../../constant/constant";

// Category movie
export const getCategoryMovie = async () => {
  try {
    // console.log("getCategoryMovie: Run")
    const response = await axios.get(movieGenre, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
      },
    });

    // console.log("Data:", response.data.genres);
    return response.data.genres;
  } catch (error) {
    return `${error}`;
  }
};
