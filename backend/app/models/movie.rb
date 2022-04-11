class Movie < ApplicationRecord
  has_many :bookmarks, dependent: :destroy
  has_many :movie_reviews, dependent: :destroy
  has_many :lists, through: :bookmarks 
  has_many :genres, through: :movie_genres
  validates :overview, uniqueness: true, presence: true
end