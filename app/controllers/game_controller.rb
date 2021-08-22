class GameController < ApplicationController
  include ApplicationHelper,GameHelper
  def show

  end

  #accept user input for new room
  #invite players and decide how many CPU players
  def new
    add_player_list
    @room = Room.new
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

  end

end
