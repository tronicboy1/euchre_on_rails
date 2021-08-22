# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_22_005247) do

  create_table "gameupdates", force: :cascade do |t|
    t.text "text", null: false
    t.datetime "created_at", null: false
    t.integer "user_id"
    t.index ["user_id"], name: "index_gameupdates_on_user_id"
  end

  create_table "room", force: :cascade do |t|
    t.text "room_name", null: false
    t.integer "player1_id"
    t.integer "player2_id"
    t.integer "player3_id"
    t.integer "player4_id"
    t.index ["player1_id"], name: "index_room_on_player1_id"
    t.index ["player2_id"], name: "index_room_on_player2_id"
    t.index ["player3_id"], name: "index_room_on_player3_id"
    t.index ["player4_id"], name: "index_room_on_player4_id"
  end

  create_table "user", force: :cascade do |t|
    t.string "username", limit: 50, null: false
    t.datetime "created_at", null: false
    t.string "password_digest"
    t.integer "room_id"
    t.index ["room_id"], name: "index_user_on_room_id"
  end

  add_foreign_key "gameupdates", "user"
  add_foreign_key "room", "user", column: "player1_id"
  add_foreign_key "room", "user", column: "player2_id"
  add_foreign_key "room", "user", column: "player3_id"
  add_foreign_key "room", "user", column: "player4_id"
end
