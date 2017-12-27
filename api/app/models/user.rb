# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :rememberable
  include DeviseTokenAuth::Concerns::User
  before_validation :parse_image

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
  has_attached_file :picture, styles: { medium: '300x300>', thumb: '100x100>' },
                              default_url: '/user.png'
  validates_attachment_content_type :picture, content_type: %r{/\Aimage\/.*\z/}
  do_not_validate_attachment_file_type :picture
  attr_accessor :image_base

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

  def friends
    User.find(friendships.where(is_relationship_established: true).pluck(:friend_id) +
      inverse_friendships.where(is_relationship_established: true).pluck(:user_id))
  end

  private

  def parse_image
    image = Paperclip.io_adapters.for(image_base)
    image.original_filename = 'file.jpg'
    self.picture = image
  end
end
