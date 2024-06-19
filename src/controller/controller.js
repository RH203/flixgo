import axios from "axios";

// Category movie
export const getData = async (url, key) => {
  try {
    // console.log("getCategoryMovie: Run")
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
      },
    });

    // console.log("Data:", response.data.genres);
    return response.data[key];
  } catch (error) {
    return `${error}`;
  }
};
