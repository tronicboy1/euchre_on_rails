require 'base64'

class RoomcontrolChannel < ApplicationCable::Channel
  include Euchre

  def subscribed
    stream_from "chat_#{params[:room_id]}"
    ActionCable.server.broadcast("chat_#{params[:room_id]}",{"message" => "\n#{params[:username]} entered room!", "online" => "##{params[:user_id]}-status"})
  end

  def receive(data)
    dic = data.to_h
    #check if received data is a chat message or game gamecontrol
    if dic["type"] == "chat"
      ActionCable.server.broadcast("chat_#{params[:room_id]}", data)
    elsif dic["type"] == "gamecontrol"
      gamecontrol_shori(dic)
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
    else
      puts "player input"
      $game_dict[params[:room_id]].game_control(dic)
    end


  end
end
