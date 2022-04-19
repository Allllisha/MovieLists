class User < ApplicationRecord
  mount_uploader :image, ImageUploader
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  def self.guest
    find_or_create_by!(email: "guest@example.com") do |user|
      user.password = SecureRandom.urlsafe_base64
      user.name = "Guest User"
      user.nickname = "Guest User"
    end
  end
  has_many :lists, dependent: :destroy
  has_many :list_followers, dependent: :destroy
  has_many :movies, through: :bookmarks
  validates :name, presence: true
  validates :nickname, presence: true
end
