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
    user = User.find_by(username: username)
    if user
      auth = user.authenticate(password)
      user_list = add_player_list()
      if !auth.nil?
        if user.room_id
          room = Room.find_by(id: user.room_id)
          puts room.player1_id
          player1_username = User.find(room.player1_id).username
          if room.player2_id != 0
            player2_username = User.find(room.player2_id).username
          else
            player2_username = "Computer 1"
          end
          if room.player3_id != 0
            player3_username = User.find(room.player3_id).username
          else
            player3_username = "Computer 2"
          end
          if room.player4_id != 0
            player4_username = User.find(room.player4_id).username
          else
            player4_username = "Computer 3"
          end
          player_names = {
            "p1" => player1_username,
            "p2" => player2_username,
            "p3" => player3_username,
            "p4" => player4_username,
          }
          player_no = {
            room.player1_id => "p1",
            room.player2_id => "p2",
            room.player3_id => "p3",
            room.player4_id => "p4",
          }[current_user.id]
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
