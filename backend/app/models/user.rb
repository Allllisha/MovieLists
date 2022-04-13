class User < ApplicationRecord
mount_uploader :image, ImageUploader       
            # Include default devise modules.
            devise :database_authenticatable, :registerable,
                    :recoverable, :rememberable, :validatable
            include DeviseTokenAuth::Concerns::User
  has_many :lists, dependent: :destroy
  has_many :movies, through: :bookmarks  
  validates :name, presence: true
end