class User < ApplicationRecord
            # Include default devise modules.
            devise :database_authenticatable, :registerable,
                    :recoverable, :rememberable, :validatable,
                    :confirmable
            include DeviseTokenAuth::Concerns::User
  has_many :lists, dependent: :destroy
  has_many :movies, through: :bookmarks  
  validates :first_name, :last_name, presence: true
end