Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
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
