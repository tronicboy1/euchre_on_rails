class UsersController < ApplicationController
  include ApplicationHelper,UsersHelper

  def new
    #byebug
    @user = User.new
  end

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      new_update("#{current_user.username} created an account. Invite #{current_user.username} to a game!")
      flash[:success] = "Account successfully created. Welcome to Euchre on Rails, #{@user.username}!"
      redirect_to '/game'
    else
      params[:action] = "new"
      render 'new'
    end
  end

end
