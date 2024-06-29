import axios from "axios";

// Category movie
export const getData = async (url, key, page = 1) => {
  try {
    // console.log("getCategoryMovie: Run")
    const response = await axios.get(`${url}?page=${page}`, {
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


// Search by category
export const getByCategory = async (categoryId) => {

}
