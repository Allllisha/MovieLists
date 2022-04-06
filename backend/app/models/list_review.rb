class ListRewiew < ApplicationRecord
  belongs_to :user
  belongs_to :list
  validates :comment, length: { minimum: 6 }
end
