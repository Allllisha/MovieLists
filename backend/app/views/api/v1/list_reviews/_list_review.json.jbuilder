json.extract! list_review, :id, :comment, :rating, :list_id, :user_id, :created_at
json.list_name list_review.list.name
json.user_name list_review.user.nickname
json.user_photo list_review.user.image