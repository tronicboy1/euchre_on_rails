class PagesController < ApplicationController
  include ApplicationHelper

  def index
    @updates = Gameupdates.last(5).reverse!
  end

  def fetchUpdates
    updates = Gameupdates.last(10).reverse!
    render json: { gameUpdates: updates }
  end
end
