# frozen_string_literal: true

module DevisePatch
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    before_action :configure_sign_up_params, only: %i[create]

    def create
      super

      # FIXME: potentially bug, should check if create is successful first.
      params[:phoneNumbers].each do |phone_number|
        PhoneNumber.create!(
          user: User.find_by(email: params[:email]),
          number: phone_number
        )
      end
    end

    # If you have extra params to permit, append them to the sanitizer.
    def configure_sign_up_params
      devise_parameter_sanitizer.permit(
        :sign_up,
        keys: %i[name last_name gender nickname hometown birthdate relationship_status about image]
      )
    end
  end
end