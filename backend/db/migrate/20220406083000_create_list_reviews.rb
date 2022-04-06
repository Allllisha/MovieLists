class CreateListReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :list_reviews do |t|
      t.references :list, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.text :comment, null: false
      t.integer :rating, null: false, default: 0
      t.timestamps
    end
  end
end
