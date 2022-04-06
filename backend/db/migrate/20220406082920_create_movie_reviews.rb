class CreateMovieReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :movie_reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :movie, null: false, foreign_key: true
      t.text :comment, null: false
      t.float :rating, null: false, default: 0
      t.timestamps
    end
  end
end
