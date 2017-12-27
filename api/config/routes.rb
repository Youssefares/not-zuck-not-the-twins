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
    get 'friends', action: :friends
    get 'show'
    get 'friend_requests', action: :friend_requests
    get 'initiated_requests', action: :initiated_requests
    post 'request_friendship', action: :request_friendship
    post 'accept_friend_request', action: :accept_friend_request
    post 'delete_friendship', action: :delete_friendship
  end
end
