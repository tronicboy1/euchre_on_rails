class AddLeg < ActiveRecord::Migration[6.1]
  def change
    create_table :userdata do |t|
      t.primary_key :user_id
      t.string :username, :limit => 50, :null => false, :unique => true
      t.string :password_hash, :limit => 200, :null => false
    end
  end
end
