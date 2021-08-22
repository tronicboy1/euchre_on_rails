module GameHelper
  include ApplicationHelper

  def add_roomid_to_player(id,room_id)
    user = User.find(id)
    user.room_id = room_id
    #password validation will prevent from saving so must disable
    user.save(validate: false)

  end
  #add all users to room object and commit to database
  def setup_room
    player1_id = current_user.id
    player2_id = params[:player2_id][:id]
    player3_id = params[:player3_id][:id]
    player4_id = params[:player4_id][:id]
    new_room = Room.new
    new_room.room_name = params[:room_name][:room_name]
    new_room.player1_id = player1_id
    #only add human players to playerid array to avoid error
    playerid_arr = [player1_id]
    if player2_id == "computer"
      new_room.player2_id = 0
    else
      new_room.player2_id = player2_id
      playerid_arr.push(player2_id)
    end

    #check for redundancies
    if player3_id == player2_id && player3_id != "computer"
      return false
    elsif player3_id == "computer"
      new_room.player3_id = 0
    else
      new_room.player3_id = player3_id
      playerid_arr.push(player3_id)
    end

    if [player2_id,player3_id].include?(player4_id) && player4_id != "computer"
      return false
    elsif player4_id = "computer"
      new_room.player4_id = 0
    else
      new_room.player4_id = player4_id
      playerid_arr.push(player4_id)
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
    #do not collect users currently in a room
    @users = @users.collect{|user| [user.username,user.id] if user.room_id.nil?}
    #remove user from list to avoid bugs
    @users.delete([current_user.username,current_user.id])
    @users.unshift(["Computer","computer"])
  end

end
