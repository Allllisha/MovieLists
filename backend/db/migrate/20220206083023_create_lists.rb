class CreateLists < ActiveRecord::Migration[7.0]
  def change
    create_table :lists do |t|
      t.references :user, null: false, foreign_key: true
      t.string :image_url, null: false
      t.string :name, null: false
      t.timestamps
    end
  end
end
