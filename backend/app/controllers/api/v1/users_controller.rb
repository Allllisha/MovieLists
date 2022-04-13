module Api
  module V1
    class UsersController < ApplicationController
      before_action :find_user, only: [:show, :update, :destroy]

      def index 
       @users = User.all
      end
    
      def show

      end
    
      def create
        @user = User.create(user_params)
      end
    
      def update
        @user.update(user_params)
      end
    
      def destroy
        @user.destroy
      end
    
       
      private

      def find_user
        @user = User.find(params[:id])
      end
    
      def user_params
        params.permit(:name, :nickname, :email, :password, :image)
      end

    end
  end
end