class UsersController < ApplicationController
  include ApplicationHelper, UsersHelper, GameHelper

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
      redirect_to "/game"
    else
      params[:action] = "new"
      render "new"
    end
  end

  def createJson
    json_request = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_request.permit(:username, :password, :passwordCheck)
    username = json_request["username"].downcase
    password = json_request["password"]
    user = User.new()
    user.username = username
    user.password = password
    if user.save
      user_list = add_player_list()
      render json: { auth: true, userId: user.id, username: user.username, users: user_list }
    else
      render json: { auth: false }
    end
  end
end
