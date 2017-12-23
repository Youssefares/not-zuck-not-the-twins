# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :rememberable
  include DeviseTokenAuth::Concerns::User

  has_many :posts, dependent: :destroy

  has_many :phone_numbers, dependent: :destroy
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships

  has_many :inverse_friendships, class_name: 'Friendship',
                                 foreign_key: 'friend_id',
                                 dependent: :destroy
  has_many :inverse_friends, through: :inverse_friendships, source: :user

  enum gender: %i[male female other prefer_not_to_specify]
  enum relationship_status: %i[single married]

  def isfriends_with(friend)
    friendships.where(is_relationship_established: true, friend_id: friend).exists? ||
      inverse_friendships.where(is_relationship_established: true, user_id: friend).exists?
  end

  # Returns list of users that have requested friendship with current user
  def friend_requests
    ids = inverse_friendships.where(is_relationship_established: false).pluck(:user_id)
    User.find(ids)
  end

  def initiated_requests
    ids = friendships.where(is_relationship_established: false).pluck(:friend_id)
    User.find(ids)
  end

  def get_friends
    User.find(self.friendships.where(is_relationship_established: true).pluck(:friend_id)) + User.find(self.inverse_friendships.where(is_relationship_established: true).pluck(:user_id))
  end
end
