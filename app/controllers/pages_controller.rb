class PagesController < ApplicationController

  def root
    @updates = Gameupdates.last(5)
  end
end
