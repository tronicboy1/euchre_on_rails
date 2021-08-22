class GameController < ApplicationController
  include ApplicationHelper,GameHelper
  def show
    if current_user.room_id.nil?
      @room = nil
    else
      @room ||= Room.find(current_user.room_id)
    end
  end

  #accept user input for new room
  #invite players and decide how many CPU players
  def new
    add_player_list
    #@room = Room.new
  end

  def create
    #byebug
    if setup_room()
      flash[:success] = "Room created successfully!"
      redirect_to '/game'
    else
      flash[:danger] = "Something went wrong! Try a different Room Name, or check for duplicate users."
      redirect_to '/game/new'
    end

    #byebug
  end

  def destroy
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
    redirect_to '/game'


  end

end
