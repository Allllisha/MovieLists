Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :movies, only: [:index, :show]
      resources :movie_reviews
      resources :movie_genres
      resources :genres
      resources :lists 
      resources :list_reviews
      resources :bookmarks,only: [:create, :update, :destroy]     
    end
  end
end
