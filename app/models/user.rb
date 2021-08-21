# class Userdata < ActiveRecord::Base
class User < ApplicationRecord
  self.table_name = 'user'
  before_save { self.username = username.downcase}
  #self.table_name = "userdata"
  validates :username, presence: true, uniqueness: true
  #validates :password_hash, presence: true
  has_many :gameupdates
  has_secure_password
end
