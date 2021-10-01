require 'base64'

class RoomcontrolChannel < ApplicationCable::Channel

  def subscribed
    stream_from "chat_#{params[:room_id]}"
    ActionCable.server.broadcast("chat_#{params[:room_id]}",{"message" => "#{params[:username]} entered room!", "online" => "##{params[:user_id]}-status"})
  end

  def receive(data)
    dic = data.to_h
    #check if received data is a chat message or game gamecontrol
    if dic["type"] == "chat"
      ActionCable.server.broadcast("chat_#{params[:room_id]}", data)
    elsif dic["type"] == "gamecontrol"
      gamecontrol_shori(dic)
     #command for 2s,3s,4s spoof
    elsif dic["type"] == "twos_threes_and_fours"
      player_no_list = [1,2,3,4]
      card_id = [[1,2],[1,1],[0,3],[3,2],[2,1]]
      player_no_list.each do |player_no|
        card_id.each_with_index do |id,index|
          card = Card.new(id[0],id[1])
          ActionCable.server.broadcast("chat_#{params[:room_id]}",{ "img" => card.b64_img, "element" => "p#{player_no}-card#{index}", "show" => "#hand" })
          sleep(0.1)
        end
      end
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    ActionCable.server.broadcast("chat_#{params[:room_id]}",{ "disconnected" => "##{params[:user_id]}-status" })
  end

  def speak

  end

  private
  def gamecontrol_shori(dic)
    if dic["command"] == "start-game"
      $game_dict[params[:room_id]] = Game.new(params[:room_id])
      $game_dict[params[:room_id]].start_game
    #reloads gui for players who left page
    elsif dic["command"] == "reload_gui"
      $game_dict[params[:room_id]].resend_gui(dic)
    else
      $game_dict[params[:room_id]].game_control(dic)
    end
  end
end
