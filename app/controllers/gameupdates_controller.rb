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
      flash[:danger] = "Something went wrong!"
      render 'new'
    end
  end

  def edit
    @update_edit = Gameupdates.find(params[:id])
  end

  def update
    @update_edit = Gameupdates.find(params[:id])
    @update_edit.text = params[:gameupdates][:text]
    if @update_edit.save
      flash[:primary] = "Update was saved"
      redirect_to '/gameupdates/'
    else
      flash[:danger] = "Something went wrong!"
      render 'edit'
    end
  end

  def destroy
    delete = Gameupdates.find(params[:id])
    delete.destroy
    redirect_to '/gameupdates/'
  end
end
