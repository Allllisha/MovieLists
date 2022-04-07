class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.string :overview, null: false
      t.string :poster_url, null: false
      t.float  :rating, null: false, default: 0
      t.timestamps
    end
  end
end
