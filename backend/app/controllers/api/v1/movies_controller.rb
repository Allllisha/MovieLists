module Api
  module V1
    class MoviesController < ApplicationController

      def index
          @movies = Movie.all
      end
    
      def show
        @movie = Movie.find(params[:id])
      end

    end
  end
end