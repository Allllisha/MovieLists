json.extract! list_review, :id, :comment, :rating, :list_id, :user_id, :created_at
json.user_name list_review.user.nickname
json.user_image  list_review.user.image

