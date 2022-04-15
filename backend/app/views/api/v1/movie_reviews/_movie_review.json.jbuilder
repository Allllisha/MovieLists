json.extract! movie_review, :id, :comment, :rating, :movie_id, :user_id, :created_at
json.user_name movie_review.user.nickname
json.user_image movie_review.user.image

