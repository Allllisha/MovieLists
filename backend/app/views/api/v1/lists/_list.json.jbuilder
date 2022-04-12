json.extract! list, :id, :name, :image_url, :user_id
json.user_name list.user.nickname
json.bookmarks do
  json.array! list.bookmarks
end
json.list_reviews do
  json.array! list.list_reviews
end


