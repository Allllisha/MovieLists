module Api
  module V1
    class ListsController < ApplicationController
      before_action :find_customer, only: [:show, :update, :destroy]

      def index
        @lists = List.all
      end
    
      def show

      end
    
      def create
        @list = List.create(list_params)
      end
    
    
      def update
        @list.update(list_params)
      end
    
      def destroy
        @list.destroy
      end
    
    
    
      private

      def find_list
        @list = List.find(params[:id])
      end
    
      def list_params
        params.permit(:name, :image_url, :user_id)
      end

    end
  end
end