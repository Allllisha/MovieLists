class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

    def sign_up_params
      params.permit(:nickname, :photo_url, :email, :password, :password_confirmation, :name)
    end
end