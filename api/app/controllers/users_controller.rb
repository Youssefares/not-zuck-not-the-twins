# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @requested_user = User.where(id: params[:id]).first
    render status: :not_found, json: 'user not found' if @requested_user.nil?
    # hide about me and birthdate if the requested user is not me and is not my friend
    not_my_friend = current_user.friendships.where(
      friend_id: @requested_user.id, is_relationship_established: true
    ).empty?

    if current_user.id != @requested_user.id && not_my_friend
      @requested_user.about = nil
      @requested_user.birthdate = nil
    end

    render status: :ok, json: { user: @requested_user, image_url: @requested_user.picture.url }
  end

  def index
    @users = User.all
    render status: :ok, json: @users
  end

  def friends
    @user = User.find(params[:user_id])
    @friends = @user.friends
    render status: :ok, json: @friends
  end

  def friend_requests
    users = User.find(params[:user_id]).friend_requests
    render status: :ok, json: users
  end

  def initiated_requests
    users = User.find(params[:user_id]).initiated_requests
    render status: :ok, json: users
  end

  def request_friendship
    if Friendship.where(user_id: params[:user_id], friend_id: params[:friend_id]).exists? ||
       Friendship.where(user_id: params[:friend_id], friend_id: params[:user_id]).exists?
      render status: :not_modified, json: { message: 'User already has a relationship with friend' }.to_json
    else
      @friendship = Friendship.create(user_id: params[:user_id], friend_id: params[:friend_id], is_relationship_established: false)
      if @friendship.valid?
        @friendship.save
        render status: :created, json: { message: 'Successfully created friend request' }.to_json
      else
        render status: :bad_request, json: { message: @friendship.errors.messages }.to_json
      end
    end
  end

  def accept_friend_request
    @friendship = User.find(params[:user_id]).inverse_friendships.where(user_id: params[:friend_id], friend_id: params[:user_id])
    if @friendship.exists?
      @friendship = @friendship.first
      @friendship.is_relationship_established = true
      @friendship.save
      user = User.find(params[:user_id])
      friend = User.find(params[:friend_id])
      user.posts.create(body: user.name + ' became friends with ' + friend.name, is_public: false).save
      friend.posts.create(body: friend.name + ' became friends with ' + user.name, is_public: false).save
      render status: :ok, json: { message: 'Successfully accepted friend request' }.to_json
    else
      render status: :bad_request, json: {
        message: @friendship.errors.messages
      }.to_json
    end
  end

  # Could be called to cancel a friend request or delete a friendship
  def delete_friendship
    user = User.find(params[:user_id])
    @friendship = user.friendships.where(friend_id: params[:friend_id]).first ||
                  user.inverse_friendships.where(friend_id: params[:user_id]).first
    if @friendship.present? # Can't call exists on a single record
      @friendship.delete
      render status: :ok, json: {
        message: 'Successfully deleted friendship'
      }.to_json
    else
      render status: :bad_request, json: {
        message: 'No friendship to delete'
      }
    end
  end

  def feed
    @feed = []
    @user = User.find(params[:user_id])

    # get my friends' private posts
    @user.friendships.each do |friendship|
      next unless friendship.is_relationship_established

      # TODO: merge arrays without making new copies
      @feed += Post.where(user_id: friendship.friend_id, is_public: false)
    end

    # get all public posts (including my public posts and my friends' public posts)
    @feed += Post.where(is_public: true)

    # get my private posts
    @feed += Post.where(user_id: @user.id, is_public: false)

    @feed.sort!  { |a, b| b.updated_at <=> a.updated_at }

    render json: @feed
  end
end
