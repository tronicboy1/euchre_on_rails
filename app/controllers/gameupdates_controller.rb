class GameupdatesController < ApplicationController
  def show
    #byebug
    @result = Gameupdates.find(params[:id])
  end

  def index
    @articles = Gameupdates.last(5)
  end

  def new
    @new_update = Gameupdates.new
  end

  def create
    @new_update = Gameupdates.new
    @new_update.text = params[:gameupdates][:text]
    if @new_update.save
      flash[:primary] = "Update was saved"
      redirect_to '/gameupdates/'
    else
      render 'new'
    end
  end

  def edit
    @update_edit = Gameupdates.find(params[:id])
  end

  def update
    @new_update = Gameupdates.find(params[:id])
    @new_update.text = params[:gameupdates][:text]
    if @new_update.save
      flash[:primary] = "Update was saved"
      redirect_to '/gameupdates/'
    else
      render 'new'
    end
  end
end
