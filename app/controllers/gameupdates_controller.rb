class GameupdatesController < ApplicationController
  before_action :set_updateid, only: [:show,:edit,:update,:destroy]

  def show
    #byebug
  end

  def index
    @updates = Gameupdates.last(25).reverse!
  end

  def new
    @update = Gameupdates.new
  end

  def create
    @update = Gameupdates.new(set_update_params)
    #@update.text = params[:gameupdates][:text]
    if @update.save
      flash[:primary] = "Update was saved"
      redirect_to '/gameupdates/'
    else
      flash[:danger] = "Something went wrong!"
      render 'new'
    end
  end

  def edit
    
  end

  def update
    @update.update(set_update_params)
    if @update.save
      flash[:primary] = "Update was saved"
      redirect_to '/gameupdates/'
    else
      flash[:danger] = "Something went wrong!"
      render 'edit'
    end
  end

  def destroy

    @update.destroy
    flash[:success] = "Successfully deleted."
    redirect_to '/gameupdates/'
  end




  #private ensures that methods are only used in this rb file
  private
  def set_updateid
    @update = Gameupdates.find(params[:id])
  end

  def set_update_params
    params.require(:gameupdates).permit(:text)
  end
end
