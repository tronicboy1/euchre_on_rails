module GameHelper
  include ApplicationHelper
  def setup_room
    new_room = Room.new
    new_room.room_name = params[:room_name][:room_name]
    new_room.player1_id = current_user.id
    if params[:player2][:id] != "computer"
      new_room.player2_id = params[:player2][:id]
    end
    if params[:player3][:id] != "computer"
      new_room.player3_id = params[:player3][:id]
    end
    if params[:player4][:id] != "computer"
      new_room.player4_id = params[:player4][:id]
    end
    new_room.save
  end


end
