json.extract! bookmark, :id, :movie_id, :list_id, :comment
json.movie_title bookmark.movie.title
json.overview bookmark.movie.overview
json.poster_url bookmark.movie.poster_url
json.rating bookmark.movie.rating
json.list_name bookmark.list.name