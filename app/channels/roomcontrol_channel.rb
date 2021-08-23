class RoomcontrolChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room_id]}"
    ActionCable.server.broadcast("chat_#{params[:room_id]}",{"message" => "\n#{params[:username]} entered room!", "online" => "##{params[:user_id]}-status"})
  end

  def receive(data)
    #check if received data is a chat message or game gamecontrol
    ActionCable.server.broadcast("chat_#{params[:room_id]}", data)
    # if data[:type] == "chat"
    #   ActionCable.server.broadcast("chat_#{params[:room_id]}", data)
    # elsif data[:type] == "gamecontrol"
    #   puts data[:action]
    # end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    ActionCable.server.broadcast("chat_#{params[:room_id]}",{ "disconnected" => "##{params[:user_id]}-status" })
  end

  def speak

  end
end
