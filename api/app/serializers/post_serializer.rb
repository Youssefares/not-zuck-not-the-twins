# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :body, :is_public
  has_one :user

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :last_name, :nickname, :email, :picture
  end
end
