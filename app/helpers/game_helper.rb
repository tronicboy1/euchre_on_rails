module GameHelper
  include ApplicationHelper

  def add_roomid_to_player(id, room_id)
    user = User.find(id)
    user.room_id = room_id
    #password validation will prevent from saving so must disable
    user.save(validate: false)
  end

  #add all users to room object and commit to database
  def setup_room(players)
    player1_id = players["p1"]
    player2_id = players["p2"]
    player3_id = players["p3"]
    player4_id = players["p4"]
    new_room = Room.new
    new_room.room_name = Time.now.to_s
    new_room.player1_id = player1_id
    #only add human players to playerid array to avoid error
    playerid_arr = [player1_id]
    if player2_id == "computer"
      new_room.player2_id = 0
    else
      new_room.player2_id = player2_id
      playerid_arr.push(player2_id)
    end

    #check for redundancies
    if player3_id == player2_id && player3_id != "computer"
      return false
    elsif player3_id == "computer"
      new_room.player3_id = 0
    else
      new_room.player3_id = player3_id
      playerid_arr.push(player3_id)
    end
    if [player2_id, player3_id].include?(player4_id) && player4_id != "computer"
      return false
    elsif player4_id == "computer"
      new_room.player4_id = 0
    else
      new_room.player4_id = player4_id
      playerid_arr.push(player4_id)
    end
    saved = new_room.save
    if saved
      new_room_id = Room.find_by(room_name: new_room.room_name).id

      #add roomid to all players rooms array
      playerid_arr.each do |id|
        add_roomid_to_player(id, new_room_id)
      end
      return new_room_id
    else
      return false
    end
  end

  #create list with computer and all users in list so player can create room accessable to friends
  def add_player_list
    @users = User.all
    #do not collect users currently in a room
    @users = @users.collect { |user| [user.username, user.id] if user.room_id.nil? }
    #remove blank arrays from list
    @users.delete_if { |x| x.nil? }
    @users.unshift(["Computer", "computer"])
    return @users
  end
end
