class GameController < ApplicationController
  include ApplicationHelper,GameHelper
  def show
    if current_user.room_id.nil?
      redirect_to '/game/new'
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
      new_update("#{current_user.username} created a new room!")
      flash[:success] = "Room created successfully!"
      redirect_to '/game'
    else
      flash[:danger] = "Something went wrong! Try a different Room Name, or check for duplicate users."
      redirect_to '/game/new'
    end

    #byebug
  end

  def destroy
    destroy_room
    redirect_to '/game'


  end

end
