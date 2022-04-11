module Api
  module V1
    class UsersController < ApplicationController
      before_action :find_customer, only: [:show, :update, :destroy]

      def index 
       @users = User.all
      end
    
      def show

      end
    
      def create
        @users =  User.create(user_params)
      end
    
      def update
        @users.update(user_params)
      end
    
      def destroy
        @users.destroy
      end
    
       
      private

      def find_user
        @users = User.find(params[:id])
      end
    
      def user_params
        params.permit(:name, :nickname, :email, :password, :image)
      end

    end
  end
end