# frozen_string_literal: true

class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render status: :ok , json:{user: @user,
      image_url: @user.picture.url}.to_json

  end

  def index
    @users = User.all
    render status: :ok, json: @users
  end

  def friends
    @user = User.find(params[:user_id])
      @friends = @user.get_friends
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
      render status: :not_modified, json: {message: "User already has a relationship with friend"}.to_json
    else
      @friendship = Friendship.create(user_id:params[:user_id], friend_id: params[:friend_id], is_relationship_established: false)
      if @friendship.valid?
        @friendship.save
        render status: :created, json: {message: "Successfully created friend request"}.to_json
      else
        render status: :bad_request, json: {message: @friendship.errors.messages}.to_json
      end
    end
  end

  def accept_friend_request
    @friendship = User.find(params[:user_id]).inverse_friendships.where(user_id: params[:friend_id], friend_id: params[:user_id])
    if @friendship.exists?
      @friendship = @friendship.first
      @friendship.is_relationship_established = true
      @friendship.save
      render status: :ok, json: { message: "Successfully accepted friend request"}.to_json
    else
      render status: :bad_request, json: {
        message: @friendship.errors.messages
      }.to_json
    end
  end

#Could be called to cancel a friend request or delete a friendship
  def delete_friendship
    user = User.find(params[:user_id])
    @friendship = user.friendships.where(friend_id: params[:friend_id]).first || user.inverse_friendships.where(friend_id: params[:user_id]).first
    if @friendship.present? #Can't call exists on a single record
      @friendship.delete
      render status: :ok, json: {
        message: 'Successfully deleted friendship'
      }.to_json
    else
      render status: :bad_request, json: {
        message: "No friendship to delete"
      }
    end
  end
  def feed
    @feed = []
    @user = User.find(params[:user_id])
    @user.friendships.each do |friendship|
      next unless friendship.is_relationship_established

      # TODO: merge arrays without making new copies
      @feed += Post.where(user_id: friendship.friend_id, is_public: true)
    end

    @feed.sort!  { |a, b| b.updated_at <=> a.updated_at }

    render json: @feed
  end
end
