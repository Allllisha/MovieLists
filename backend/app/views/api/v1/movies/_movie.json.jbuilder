json.extract! movie, :id, :title, :overview, :poster_url, :rating
json.movie_reviews do 
  json.array!(movie.movie_reviews) do |movie_review|  
    json.partial!(movie_review)
  end
end
