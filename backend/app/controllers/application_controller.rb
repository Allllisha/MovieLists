class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        helper_method :current_user, :user_signed_in?     
end
