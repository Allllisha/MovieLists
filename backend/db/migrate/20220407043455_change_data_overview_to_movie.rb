class ChangeDataOverviewToMovie < ActiveRecord::Migration[6.0]
  def change
    change_column :movies, :overview, :text
  end
end
