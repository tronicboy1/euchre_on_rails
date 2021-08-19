class RemoveUpdatedAtFromGameupdates < ActiveRecord::Migration[6.1]
  def change
    remove_column :gameupdates, :updated_at
  end
end
