module Api
  module V1
    class ListFollowersController < ApplicationController
      before_action :find_list_follower, only: [:show, :update, :destroy]

      def index
        @list_followers = ListFollower.all
      end

      def show
      end

      def create
        @list_follower = ListFollower.create(list_follower_params)
      end

      def update
        @list_follower.update(list_follower_params)
      end

      def destroy
        @list_follower.destroy
      end

      private

      def find_list_follower
        @list_follower = ListFollower.find(params[:id])
      end

      def list_follower_params
        params.permit(:list_id, :user_id)
      end
    end
  end
end
