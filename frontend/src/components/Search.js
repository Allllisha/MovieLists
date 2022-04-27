// import { api } from "../apis/Axios";
import { useState, useEffect } from "react";
import algoliasearch from 'algoliasearch'; 
import axios from 'axios'

export const GenerateIndex = async () => {
  const [movies, setMovies] = useState([]);
  const getMoviesData = async () => {
    const res = await axios.get("https://api.my-movielists.com/api/v1/movies.json");
    setMovies(res.data);
    console.log(res.data)
  };

  useEffect(() => {
    getMoviesData();
  }, []);
 
  console.log(movies)
  const objects = movies.map((movie) => {
    return {
      objectID: movie.id,
      overview: movie.overview,
      poster_url: movie.poster_url,
      title: movie.title,
      rating: movie.rating,
    };
  });
  const client = algoliasearch("BO4ZQJ03SB", "9d6db57839b25a5cd63807d7d5620804");
  const index = client.initIndex('MovieList');
  await index.saveObjects(objects, { autoGenerateObjectIDIfNotExist: true });
};
