class SessionsController < ApplicationController
  include CurrentUser

  def new
  end

  def create
    user = User.find_by(username: params[:session][:username].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in(user)
      flash[:success] = "Logged in successfully. Welcome back, #{session[:username]}!"
      redirect_to '/game'
    else
      flash.now[:danger] = "Password or Username was incorrect."
      render 'new'
    end
  end

  def destroy

  end
end
