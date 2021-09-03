class GameUpdates < ApplicationRecord
  self.table_name = 'gameupdates'
  validates :text, presence: true
  belongs_to :user, optional: true
end
