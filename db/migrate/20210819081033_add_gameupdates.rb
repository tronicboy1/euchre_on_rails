class AddGameupdates < ActiveRecord::Migration[6.1]
  def change
    create_table :gameupdates do |t|
      t.text :text, :null => false
      t.datetime :datetime
    end
  end
end
