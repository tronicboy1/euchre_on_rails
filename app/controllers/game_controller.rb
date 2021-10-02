class GameController < ApplicationController
  include ApplicationHelper,GameHelper

  def show
    #redirect if not logged in
    if !logged_in?
      flash[:warning] = "You must login to access this page."
      redirect_to '/login'
    elsif current_user.room_id.nil?
      redirect_to '/game/new'
    else
      @room ||= Room.find(refresh_userinfo_from_db.room_id)
      @player1_username = User.find(@room.player1_id).username
      if @room.player2_id != 0
        @player2_username = User.find(@room.player2_id).username
      else
        @player2_username = "Computer 1"
      end
      if @room.player3_id != 0
        @player3_username = User.find(@room.player3_id).username
      else
        @player3_username = "Computer 2"
      end
      if @room.player4_id != 0
        @player4_username = User.find(@room.player4_id).username
      else
        @player4_username = "Computer 3"
      end
    end
  end

  #accept user input for new room
  #invite players and decide how many CPU players
  def new
    if !logged_in?
      flash[:warning] = "You must login to access this page."
      redirect_to '/login'
    elsif !refresh_userinfo_from_db.room_id.nil?
      redirect_to '/game'
    else
      @updates = Gameupdates.last(5).reverse!
      add_player_list
    end
  end

  def create
    if setup_room()
      new_update("#{current_user.username} created a new room!")
      flash[:success] = "Room created successfully!"
      redirect_to '/game'
    else
      flash[:danger] = "Something went wrong! Try a different Room Name, or check for duplicate users."
      redirect_to '/game/new'
    end

  end

  def destroy
    if !current_user.room_id.nil?
      destroy_room
    end
    redirect_to '/game'
  end

end
