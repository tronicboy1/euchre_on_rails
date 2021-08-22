class RoomcontrolChannel < ApplicationCable::Channel
  def subscribed
    byebug
    stream_from "chat_#{params[:room_id]}"

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak

  end
end
