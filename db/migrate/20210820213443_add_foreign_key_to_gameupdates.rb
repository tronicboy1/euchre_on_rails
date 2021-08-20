class AddForeignKeyToGameupdates < ActiveRecord::Migration[6.1]
  def change
    add_reference :gameupdates, :user, foreign_key: true
  end
end
