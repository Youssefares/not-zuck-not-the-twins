# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User',
                              at: 'auth',
                              controllers: {
                                registrations: 'devise_patch/registrations'
                              },
                              skip: %i[omniauth_callbacks password]

  resources :users do
    resources :posts
    get 'feed', action: :feed
  end

  get 'user/show'
  get 'user/list'
  get 'user/friends'
  get 'user/friend_requests'
end
