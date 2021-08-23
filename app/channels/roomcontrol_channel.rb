class RoomcontrolChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room_id]}"
    ActionCable.server.broadcast("chat_#{params[:room_id]}",{"message" => "\n#{params[:username]} joined!", "online" => "##{params[:user_id]}-status"})
  end

  def receive(data)
    puts "received data from user #{data}"
    ActionCable.server.broadcast("chat_#{params[:room_id]}", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    puts "user left room"
    ActionCable.server.broadcast("chat_#{params[:room_id]}",{ "disconnected" => "##{params[:user_id]}-status" })
  end

  def speak

  end
end
