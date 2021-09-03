class PagesController < ApplicationController
  include ApplicationHelper
  def index
    redirect_to '/game/new' if logged_in?
    @updates = GameUpdates.last(5).reverse!
  end

end
