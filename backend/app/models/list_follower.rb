class ListFollower < ApplicationRecord
  belongs_to :user
  belongs_to :list
  validates :list_id, uniqueness: true
end
