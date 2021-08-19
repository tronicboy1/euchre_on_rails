class Userdata < ActiveRecord::Base
  self.table_name = "userdata"
  self.primary_key = "user_id"
end
