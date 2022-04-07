class ListReviews < ActiveRecord::Migration[6.1]
  def change
    drop_table :list_reviews
  end
end
