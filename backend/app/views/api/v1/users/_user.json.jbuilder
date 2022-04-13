json.extract! user, :id, :name, :nickname, :uid, :image, :email

json.lists do 
  json.array!(user.lists) do |list|  
    json.partial!(list)
  end
end

json.list_followers do 
  json.array!(user.list_followers) do |list_follower|  
    json.partial!(list_follower)
  end
end
