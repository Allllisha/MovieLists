json.extract! list, :id, :name, :image_url, :user_id
json.user_name list.user.nickname
json.user_image list.user.image
json.movies list.movies, :id, :title, :overview, :rating, :poster_url

json.bookmarks do 
  json.array!(list.bookmarks) do |bookmark|  
    json.partial!(bookmark)
  end
end

json.list_reviews do 
  json.array!(list.list_reviews) do |list_review|  
    json.partial!(list_review)
  end
end

json.list_followers do 
  json.array!(list.list_followers) do |list_follower|  
    json.partial!(list_follower)
  end
end

