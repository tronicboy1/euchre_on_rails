class AddAssociatedRoomIDtoUser < ActiveRecord::Migration[6.1]
  def change
    add_reference :user, :room
  end
end
