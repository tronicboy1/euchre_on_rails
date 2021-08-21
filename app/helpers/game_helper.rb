module GameHelper
  def setup_room
    if params[:player2][:id] != "computer"
      send_invite
    end
  end

  def send_invite

  end
end
