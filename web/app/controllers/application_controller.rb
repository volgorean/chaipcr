class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  protected
  
  def logged_in?
    current_user != nil
  end
  
  # Renders a 401 status code if the current user is not authorized
  def ensure_authenticated_user
    head :unauthorized unless logged_in? && authorized?
  end

  def authorized?
    return true
  end
  
  # Returns the active user associated with the access token if available
  def current_user
    if @current_user == nil
      user_token = UserToken.active.where(access_token: UserToken.digest(token)).first
      if user_token
        @current_user = user_token.user
      end
    end
    return @current_user
  end

  # Parses the access token from the header
  def token
    if cookies[:authentication_token] != nil
      cookies[:authentication_token]
    else
      bearer = request.headers["HTTP_AUTHORIZATION"]

      # allows our tests to pass
      bearer ||= request.headers["rack.session"].try(:[], 'Authorization')

      if bearer.present?
        bearer.split.last
      else
        nil
      end
    end
  end
end
