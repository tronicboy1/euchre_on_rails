class RoomcontrolChannel < ApplicationCable::Channel
  def subscribed
    byebug
    stream_from "chat_#{params[:room_id]}"
  end

  def receive(data)
    puts "received data from user"
    ActionCable.server.broadcast("chat_#{params[:room_id]}","data transmitted from server")
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak

  end
end
