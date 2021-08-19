class AddTimestampsToGameupdates < ActiveRecord::Migration[6.1]
  def change
    remove_column :gameupdates, :datetime
    add_column :gameupdates, timestamps
  end
end
