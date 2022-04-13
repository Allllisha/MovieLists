json.extract! list_follower, :id, :user_id, :list_id
json.user.nickname list_review.user.nickname
json.user_photo list_review.user.image
json.list_name list_follower.list.name