module GameHelper
  include ApplicationHelper

  def add_roomid_to_player(id,room_id)
    user = User.find(id)
    user.room_id = room_id
    user.save

  end
  #add all users to room object and commit to database
  def setup_room
    new_room = Room.new
    new_room.room_name = params[:room_name][:room_name]
    new_room.player1_id = current_user.id
    #only add human players to playerid array to avoid error
    playerid_arr = [current_user.id]
    if params[:player2_id][:id] != "computer"
      new_room.player2_id = params[:player2_id][:id]
      playerid_arr.push(params[:player2_id][:id])
    end
    if params[:player3_id][:id] != "computer"
      new_room.player3_id = params[:player3_id][:id]
      playerid_arr.push(params[:player3_id][:id])
    end
    if params[:player4_id][:id] != "computer"
      new_room.player4_id = params[:player4_id][:id]
      playerid_arr.push(params[:player4_id][:id])
    end
    if new_room.save
      new_room_id = Room.find_by(room_name: params[:room_name][:room_name]).id

      #add roomid to all players rooms array
      playerid_arr.each do |id|
        add_roomid_to_player(id,new_room_id)
      end
      return true
    else
      return false
    end

  end

  #get rooms user is associated with and return with room id
  def user_room_list

  end

  #create list with computer and all users in list so player can create room accessable to friends
  def add_player_list
    @users = User.all
    @users = @users.collect{|user| [user.username,user.id]}
    #remove user from list to avoid bugs
    @users.delete([current_user.username,current_user.id])
    @users.unshift(["Computer","computer"])
  end

end
