module ApplicationHelper
  def new_update(text)
    update = Gameupdates.new(text: text)
    update.save
  end

  def log_in(user)
    session[:user_id] = user.id
    session[:username] = user.username
  end

  def current_user
    return @current_user ||= User.find_by(id: session[:user_id])
  end

  def refresh_userinfo_from_db
    return @current_user = User.find_by(id: session[:user_id])
  end

  def logged_in?
    current_user
    return !@current_user.nil?
  end

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

  def get_room_info(room_id, id)
    room = Room.find_by(id: room_id)
    puts room.player1_id
    player1_username = User.find(room.player1_id).username
    if room.player2_id != 0
      player2_username = User.find(room.player2_id).username
    else
      player2_username = "Computer 1"
    end
    if room.player3_id != 0
      player3_username = User.find(room.player3_id).username
    else
      player3_username = "Computer 2"
    end
    if room.player4_id != 0
      player4_username = User.find(room.player4_id).username
    else
      player4_username = "Computer 3"
    end
    player_names = {
      "p1" => player1_username,
      "p2" => player2_username,
      "p3" => player3_username,
      "p4" => player4_username,
    }
    player_no = {
      room.player1_id => "p1",
      room.player2_id => "p2",
      room.player3_id => "p3",
      room.player4_id => "p4",
    }[id]
    room_info = { player_names: player_names, player_no: player_no }
    return room_info
  end

  def destroy_room(room_id)
    room = Room.find(room_id)
    associated_users = [room.player1_id, room.player2_id, room.player3_id, room.player4_id]
    associated_users.each do |id|
      if id != 0
        user = User.find(id)
        user.room_id = nil
        user.save(validate: false)
      end
    end
    #remove room from global dict memory
    $game_dict.delete(:room_id)
    room.destroy
  end
end
