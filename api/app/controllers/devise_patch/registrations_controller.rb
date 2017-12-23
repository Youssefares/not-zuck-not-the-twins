# frozen_string_literal: true

module DevisePatch
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    before_action :configure_sign_up_params, only: %i[create]

    def create
      super

      # FIXME: potentially bug, should check if create is successful first.
      if params[:phoneNumbers]
      params[:phoneNumbers].each do |phone_number|
        PhoneNumber.create!(
          user: User.find_by(email: params[:email]),
          number: phone_number
        )
      end
      end
      # self.create_picture
    end

    # If you have extra params to permit, append them to the sanitizer.
    def configure_sign_up_params
      devise_parameter_sanitizer.permit(
        :sign_up,
        keys: %i[name last_name gender nickname hometown birthdate relationship_status about image_base]
      )
    end

    def create_picture
    if params[:image_base]
      picture_params = params[:image_base]
      @user.add_picture(picture_params[:file_data], picture_params[:file_name])
    end
  end
  end
end
