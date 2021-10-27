class PagesController < ApplicationController
  include ApplicationHelper

  def index
  end

  def fetchUpdates
    updates = Gameupdates.last(10).reverse!
    render json: { gameUpdates: updates }
  end

  def destroyJson
    json_request = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_request.permit(:roomId)
    room_id = json_request[:roomId]
    destroy_room(room_id)
    render json: { status: "room deleted" }
  end
end
