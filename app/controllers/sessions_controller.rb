class SessionsController < ApplicationController
  #include CurrentUser
  include ApplicationHelper
  include GameHelper

  def new
  end

  def newJson
    render json: { contents: "test" }
  end

  def createJson
    json_request = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_request.permit(:username, :password)
    username = json_request["username"].downcase
    password = json_request["password"]
    puts username
    puts password
    user = User.find_by(username: username)
    if user
      auth = user.authenticate(password)
      user_list = add_player_list()
      if !auth.nil?
        if user.room_id
          room_info = get_room_info(user.room_id, user.id)
          player_names = room_info[:player_names]
          player_no = room_info[:player_no]
          render json: { auth: true, roomId: user.room_id, userId: user.id, username: user.username, users: user_list, playerNames: player_names, playerNo: player_no }
        else
          render json: { auth: true, roomId: user.room_id, userId: user.id, username: user.username, users: user_list }
        end
      end
    else
      render json: { auth: false }
    end
  end

  def create
    user = User.find_by(username: params[:session][:username].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in(user)
      flash[:success] = "Logged in successfully. Welcome back, #{session[:username]}!"
      redirect_to "/game"
    else
      flash.now[:danger] = "Password or Username was incorrect."
      render "new"
    end
  end

  def destroy
    if !current_user.room_id.nil?
      destroy_room
    end
    session.clear
    flash[:success] = "Logged out. Come back soon!"
    redirect_to root_path
  end
end
