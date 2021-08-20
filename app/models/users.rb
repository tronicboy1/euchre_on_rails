# class Userdata < ActiveRecord::Base
class Users < ApplicationRecord
  #self.table_name = "userdata"
  validates :username, presence: true, uniqueness: true
  #validates :password_hash, presence: true
  has_many :gameupdates
  has_secure_password
end
