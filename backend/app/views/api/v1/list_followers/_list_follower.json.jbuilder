json.extract! list_follower, :id, :user_id, :list_id
json.user_firstname list_review.user.first_name
json.user_last list_review.user.last_name
json.user_photo list_review.user.photo_url
json.list_name list_follower.list.name