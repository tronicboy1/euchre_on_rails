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
      flash[:success] = "Account successfully created. Welcome to Euchre on Rails, #{@user.username}!"
      redirect_to '/game'
    else
      params[:action] = "new"
      render 'new'
    end
  end

end
