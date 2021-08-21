module CurrentUser
  def log_in(user)
    session[:user_id] = user.id
    session[:username] = user.username
    session[:authenticated] = true
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def logged_in?
    current_user
    return @current_user.nil?
  end

end
