class GameupdatesController < ApplicationController
  def show
    @result = Gameupdates.find(params[:id])
  end
end
