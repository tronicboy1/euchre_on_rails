class PagesController < ApplicationController
  include ApplicationHelper

  def index
    @updates = Gameupdates.last(5).reverse!
  end
end
