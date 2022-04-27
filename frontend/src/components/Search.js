import { api } from "../apis/Axios";
import { useState, useEffect } from "react";
import algoliasearch from 'algoliasearch'; 

export const GenerateIndex = async () => {
  const [movies, setMovies] = useState([]);
  const getMoviesData = async () => {
    const res = await api.get("/movies.json");
    console.log(res)
    setMovies(res.data);
  };

  useEffect(() => {
    getMoviesData();
  }, []);

  const objects = movies.map((movie) => {
    return {
      objectID: movie.id,
      url: `https://api.my-movielists.com/api/v1/movies/${movie.id}`,
      overview: movie.overview,
      poster_url: movie.poster_url,
      title: movie.title,
      rating: movie.rating,
    };
  });
  const client = algoliasearch(`${process.env.REACT_APP_ALGID}`, `${process.env.REACT_APP_ALADMIN}`);
  const index = client.initIndex('MovieList');
  await index.saveObjects(objects, { autoGenerateObjectIDIfNotExist: true });
};
