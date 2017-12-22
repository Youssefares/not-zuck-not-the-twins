# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :rememberable
  include DeviseTokenAuth::Concerns::User

  has_many :posts, dependent: :destroy

  has_many :PhoneNumber, dependent: :destroy
  has_many :friendships, dependent: :destroy
  has_many :friends, :through => :friendships
  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id", dependent: :destroy
  has_many :inverse_friends, :through => :inverse_friendships, :source => :user

  enum gender: %i[ male female lesbians male_lesbians homosexual
                   heterosexual bisexual prefer_not_to_specify]
  # we don't want to piss off emma watson
  enum relationship_status: %i[single married]
end
