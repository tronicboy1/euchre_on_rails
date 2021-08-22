class DropRoomTableAndRecreate < ActiveRecord::Migration[6.1]
  def change
    drop_table :room
    create_table :room do |t|
      t.string :room_name
      t.integer :player1_id
      t.integer :player2_id
      t.integer :player3_id
      t.integer :player4_id
      t.timestamps
    end
  end
end
