class PagesController < ApplicationController

  def index
    @updates = Gameupdates.last(5)
  end

end
