class List < ApplicationRecord
  mount_uploader :image_url, ImageUploader
  has_many :list_reviews, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :movies, through: :bookmarks
  belongs_to :user, optional: true
  validates :name, presence: true, uniqueness: true
end