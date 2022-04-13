module Api
  module V1
    class ListReviewsController < ApplicationController
      before_action :find_list, only: [:show, :update, :destroy]

      def index 
        @list_reviews = ListReview.all
      end
    
      def show

      end
    
      def create
        @list_review = ListReview.create(list_review_params)
      end
    
    
      def update
        @list_review.update(list_review_params)
      end
    
      def destroy
        @list_review.destroy
      end
    
    
    
      private

      def find_list
        @list_review = ListReview.find(params[:id])
      end
    
      def list_review_params
        params.permit(:list_id, :user_id, :comment, :rating)
      end

    end
  end
end