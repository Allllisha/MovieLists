class MovieReview < ApplicationRecord
  belongs_to :user
  belongs_to :movie
  validates :comment, length: { minimum: 6 }
end
