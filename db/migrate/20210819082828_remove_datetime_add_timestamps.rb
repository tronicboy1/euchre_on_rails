class RemoveDatetimeAddTimestamps < ActiveRecord::Migration[6.1]
  def change
    remove_column :gameupdates, :datetime
    add_timestamps :gameupdates, :null => false
  end
end
