class AddTimestampToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :created_at, :datetime, null: false
  end
end
