class RoomTableToMany < ActiveRecord::Migration[6.1]
  def change
    create_table :room do |t|
      t.text :room_name, :null => false
      t.references :player1, foreign_key: { to_table: 'user' }
      t.references :player2, foreign_key: { to_table: 'user' }
      t.references :player3, foreign_key: { to_table: 'user' }
      t.references :player4, foreign_key: { to_table: 'user' }

    end
  end
end
