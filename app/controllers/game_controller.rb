class GameController < ApplicationController
  include ApplicationHelper,GameHelper
  def show

  end

  #accept user input for new room
  #invite players and decide how many CPU players
  def new
    @users = User.all
    @users = @users.collect{|user| [user.username,user.id]}
    @users.unshift(["Computer","computer"])
  end

  def create
    byebug
    setup_room()
    byebug
  end

  def destroy

  end

end
