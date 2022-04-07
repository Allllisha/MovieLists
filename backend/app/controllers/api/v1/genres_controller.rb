module Api
  module V1
    class GenresController < ApplicationController

      before_action :set_genre, only: [:show, :update, :destroy]

      def index
        render json: Genre.all
      end

      def show
  
      end

      def create
        @genre = Genre.create(genre_params)
      end

      def update
        @genre.update(genre_params)
      end

      def destroy
        @genre.destroy
      end

      private

      def set_genre
        @genre = Genre.find(params[:id])
      end

      def genre_params
        params.permit(:list_id, :user_id, :comment, :rating)
      end

    end
  end
end