# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User',
                              at: 'auth',
                              controllers: {
                                registrations: 'devise_patch/registrations'
                              },
                              skip: %i[omniauth_callbacks password]
  get 'user/show'
  get 'user/list'
end
