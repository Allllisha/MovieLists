module Api
  module V1
    class MovieReviewsController < ApplicationController
      before_action :find_movie_genre, only: [:show, :update, :destroy]

      def index
        @movie_reviews = MovieReview.all
      end

      def show
      end

      def create
        @movie_review = MovieReview.create(movie_review_params)
      end

      def update
        @movie_review.update(movie_review_params)
      end

      def destroy
        @movie_review.destroy
      end

      private

      def find_movie_genre
        @movie_review = MovieReview.find(params[:id])
      end

      def movie_review_params
        params.permit(:movie_id, :user_id, :image, :comment, :rating)
      end
    end
  end
end
