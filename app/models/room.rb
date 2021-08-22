class Room < ApplicationRecord
  self.table_name = 'room'
  validates :room_name, presence: true, uniqueness: true
  validates :player1_id, presence: true
  #belongs_to :user
end
