class User < ApplicationRecord
  has_many :lists, dependent: :destroy
  has_many :movies, through: :bookmarks  
  validates :first_name, :last_name, presence: true
end