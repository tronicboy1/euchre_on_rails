class UsersController < ApplicationController
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
      byebug
      flash[:success] = "Account successfully created. Welcome to Euchre on Rails, #{@user.username}!"
      redirect_to root_url
    else
      params[:action] = "new"
      render 'new'
    end
  end

  private
  def user_params
    params.require(:user).permit(:username,:password,:password_confirmation)
  end
end
