class Room < ApplicationRecord
  self.table_name = 'room'
  has_many :user
end
