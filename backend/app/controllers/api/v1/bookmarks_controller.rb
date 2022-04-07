module Api
  module V1
    class BookmarksController < ApplicationController
      before_action :set_bookmarks, only: [:create, :update, :destroy]

      def create
        @bookmark = Bookmark.create(bookmark_params)
  
      end

      def update
        @bookmark.update(bookmark_params)
      end
    
      def destroy
        @bookmark.destroy
      end
    
      private

      def set_bookmarks
        @bookmark = Bookmark.find(params[:id])
      end
      
    
      def bookmark_params
        params.permit(:comment, :movie_id, :list_id)
      end

    end
  end
end