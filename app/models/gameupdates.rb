class Gameupdates < ApplicationRecord
  validates :text, presence: true
  belongs_to :user, optional: true
end
