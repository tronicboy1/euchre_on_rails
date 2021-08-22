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

  def logged_in?
    current_user
    return !@current_user.nil?
  end

  def destroy_room
    room = Room.find(current_user.room_id)
    associated_users = [room.player1_id,room.player2_id,room.player3_id,room.player4_id]
    associated_users.each do |id|
      if id != 0
        user = User.find(id)
        user.room_id = nil
        user.save(validate: false)
      end
    end
    room.destroy
  end
end
