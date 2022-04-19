module Api
  module V1
    class BookmarksController < ApplicationController
      before_action :set_bookmarks, only: [:show, :update, :destroy]

      def index
        @bookmarks = Bookmark.all
      end

      def show
      end

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
