Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
                                            registrations: "api/v1/auth/registrations",
                                          }

      devise_scope :v1_user do
        post "auth/guest_sign_in", to: "auth/sessions#guest_sign_in"
      end

      namespace :auth do
        resources :sessions, only: %i[index]
      end
      resources :users
      resources :movies, only: [:index, :show]
      resources :movie_reviews
      resources :movie_genres
      resources :genres
      resources :lists
      resources :list_reviews
      resources :list_followers
      resources :bookmarks
    end
  end
end
