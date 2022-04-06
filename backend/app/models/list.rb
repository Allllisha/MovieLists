class List < ApplicationRecord
  has_many :bookmarks, dependent: :destroy
  has_many :reviews, dependent: :destroy,  numericality: { in: 1..5 }
  has_many :movies, through: :bookmarks
  belongs_to :user, optional: true
  validates :name, presence: true, uniqueness: true
end