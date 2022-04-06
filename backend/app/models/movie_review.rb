class MovieReview < ApplicationRecord
  belongs_to :movie
  validates :comment, length: { minimum: 6 }
end
