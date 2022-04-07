module Api
  module V1
    class MovieGenresController < ApplicationController
      before_action :find_customer, only: [:show, :update, :destroy]

      def index 
        @movie_genres = MovieGenre.all
      end
    
      def show

      end
    
      def create
        @movie_genre =  MovieGenre.create(find_movie_genre)
      end
    
      def update
        @movie_genre.update(find_movie_genre)
      end
    
      def destroy
        @movie_genre.destroy
      end
    
    
    
      private

      def find_movie_genre
        @movie_genre = MovieGenre.find(params[:id])
      end
    
      def movie_genre_params
        params.permit(:movie_id, :genre_id)
      end

    end
  end
end