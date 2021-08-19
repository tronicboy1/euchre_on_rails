# class Userdata < ActiveRecord::Base
class Userdata < ApplicationRecord
  #self.table_name = "userdata"
  validates :username, presence: true, uniqueness: true
  validates :password_hash, presence: true
end
