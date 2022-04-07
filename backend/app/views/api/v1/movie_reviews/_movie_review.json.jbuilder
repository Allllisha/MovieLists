json.extract! movie_review, :id, :comment, :rating, :movie_id, :user_id, :created_at
json.movie_title movie_review.movie.title
json.overview movie_review.movie.overview
json.poster_url movie_review.movie.poster_url
json.rating bookmark.movie.rating
json.user_firstname movie_review.user.first_name
json.user_photo movie_review.user.photo_url