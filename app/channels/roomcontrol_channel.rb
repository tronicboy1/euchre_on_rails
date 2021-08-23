class RoomcontrolChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room_id]}"
  end

  def receive(data)
    puts "received data from user #{data}"
    ActionCable.server.broadcast("chat_#{params[:room_id]}","\ndata transmitted from server\n")
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    puts "user left room"
    ActionCable.server.broadcast("chat_#{params[:room_id]}","player left room, room has been destroyed")
  end

  def speak

  end
end
