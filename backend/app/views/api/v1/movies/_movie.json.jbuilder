json.extract! movie, :id, :title, :overview, :poster_url, :rating
json.movie_reviews do
  json.array! movie.movie_reviews
end
