module ApplicationHelper
  def new_update(text)
    update = Gameupdates.new(text: text)
    update.save
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
