import { api } from "./Axios";
import { useState, useEffect } from "react";
import algoliasearch from 'algoliasearch'; 

export const GenerateIndex = async () => {
  const [movies, setMovies] = useState([]);
  const getMoviesData = async () => {
    const res = await api.get("http://localhost:8080/api/v1/movies.json");
    setMovies(res.data);
  };

  useEffect(() => {
    getMoviesData();
  }, []);

  const objects = movies.map((movie) => {
    return {
      objectID: movie.id,
      url: `http://localhost:3000/movies/${movie.id}`,
      overview: movie.overview,
      poster_url: movie.poster_url,
      title: movie.title,
      rating: movie.rating,
    };
  });
  const client = algoliasearch('O9HDSVJ69E', '00a61b7df8aad363189a919bb0cf4bae');
  const index = client.initIndex('MovieList');
  await index.saveObjects(objects, { autoGenerateObjectIDIfNotExist: true });
};