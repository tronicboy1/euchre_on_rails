class PagesController < ApplicationController
  include ApplicationHelper

  def index
  end

  def fetch_updates
    updates = Gameupdates.last(10).reverse!
    render json: { gameUpdates: updates }
  end

  def fetch_invites
    json_request = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_request.permit(:userId)
    user_id = json_request[:userId]
    user = User.find(user_id)
    if user.room_id
      room_info = get_room_info(user.room_id, user.id)
      player_names = room_info[:player_names]
      player_no = room_info[:player_no]
      render json: { roomId: user.room_id, username: user.username, playerNames: player_names, playerNo: player_no }
    else
      user_list = add_player_list()
      render json: { users: user_list }
    end
  end

  def destroy_room_json
    json_request = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_request.permit(:roomId)
    room_id = json_request[:roomId]
    destroy_room(room_id)
    render json: { status: "room deleted" }
  end

  def create_room
    json_request = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_request.permit(:p1, :p2, :p3, :p4)
    p1_id = json_request["p1"]
    created_room_id = setup_room(json_request)
    if created_room_id
      room_info = get_room_info(created_room_id, p1_id)
      player_names = room_info[:player_names]
      player_no = room_info[:player_no]
      puts "player no: "
      puts player_no
      render json: { error: false, roomId: created_room_id, playerNames: player_names, playerNo: player_no }
    else
      #send new user list along with error notification
      user_list = add_player_list()
      render json: { error: true, users: user_list }
    end
  end

  def login
    json_request = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_request.permit(:username, :password)
    username = json_request["username"].downcase
    password = json_request["password"]
    #check if username is in db
    user = User.find_by(username: username)
    if user
      #check if password is correct
      auth = user.authenticate(password)
      if auth
        #user list will be sent to players in room too
        user_list = add_player_list()
        #check if in a room
        if user.room_id
          room_info = get_room_info(user.room_id, user.id)
          player_names = room_info[:player_names]
          player_no = room_info[:player_no]
          render json: { auth: true, roomId: user.room_id, userId: user.id, username: user.username, users: user_list, playerNames: player_names, playerNo: player_no }
        #send player list if not in a room
        else
          render json: { auth: true, roomId: user.room_id, userId: user.id, username: user.username, users: user_list }
        end
      else
        render json: { auth: false }
      end
    else
      render json: { auth: false }
    end
  end

  def register
    json_request = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_request.permit(:username, :password, :passwordCheck)
    username = json_request["username"].downcase
    password = json_request["password"]
    #check username validity (no special characters)
    valid_username = username.scan(/\W/).empty?
    if valid_username
      user = User.new()
      user.username = username
      user.password = password
      if user.save
        user_list = add_player_list()
        render json: { auth: true, userId: user.id, username: user.username, users: user_list }
      else
        render json: { auth: false }
      end
    else
      render json: { auth: false }
    end
  end

  #create list with computer and all users in list so player can create room accessable to friends
  def add_player_list
    @users = User.all
    #do not collect users currently in a room
    @users = @users.collect { |user| [user.username, user.id] if user.room_id.nil? }
    #remove blank arrays from list
    @users.delete_if { |x| x.nil? }
    @users.unshift(["Computer", "computer"])
    return @users
  end
end
