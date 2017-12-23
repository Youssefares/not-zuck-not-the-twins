# frozen_string_literal: true

class UsersController < ApplicationController
  def show
    @user = User.where(id:params[:id]).first
    if @user.present?
      render json: {
        status: 200,
        result: @user,
        success: 1,
        message:''
      }.to_json
    else
      render json: {
        status: 404,
        result: '',
        message: 'No user found',
        success: 0
      }.to_json
    end
  end
  
  def list
    @users = User.all
    render json: {
      status: 200,
      result: @users,
      message: '',
      success: 1
    }.to_json
  end

  def friends
    @friends = User.find(params[:id]).get_friends
    if @friends.present?
      render json: {
        status: 200,
        result: @users,
        message: '',
        success: 1
      }.to_json
    else
      render json: {
        status: 404,
        result: '',
        message: @users.errors.messages,
        success: 0
      }.to_json
    end
  end

  def friend_requests
    users = User.find(params[:id]).friend_requests
    render json: {
      result: users,
      message: '',
      success: 1
    }
  end
  
  def initiated_requests
    users = User.find(params[:id]).initiated_requests
    render json: {
      result: users,
      message: '',
      success: 0
    }
  end

  def request_friendship
    @friendship = Friendship.create(user_id:params[:id], friend_id: params[:friend_id], is_relationship_established: false)
    if @friendship.present?
      render json: {
        result: @friendship,
        message: 'Successfully created friend request',
        success: 1
      }.to_json
    else
      render json: {
        result: '',
        message: object.errors.messages,
        success: 0
      }.to_json
    end
  end

  def accept_friend_request
    @friendship = self.inverse_friendships.where(user_id:params[:friend], friend_id: params[:id]).first
    if @friendship.present?
      @friendship.is_relationship_established = true
      @friendship.save
      render json: {
        result: '',
        message: 'Successfully accepted friend request',
        success: 1
      }
    else
      render json: {
        result: '',
        message: @friendship.errors.messages,
        success: 0
      }
    end
  end

#Could be called to cancel a friend request or delete a friendship
  def delete_friendship
    user = User.find(params[:id])
    @friendship = user.friendships.where(friend_id: params[:friend_id]).first || user.inverse_friendships.where(friend_id: params[:user_id])
    if @friendship.present?
      @friendship.destroy
      render json: {
        result: '',
        message: 'Successfully deleted friendship',
        success: 1
      }
    else
      render json: {
        result: '',
        message: @friendship.errors.messages,
        success: 0
      }
    end
  end

  def json_raper(object)
    if object.present?
      render json: {
        status: 200,
        result: object,
        message: '',
        success: 1
      }.to_json
    else
      render json: {
        status: 404,
        result: object,
        message: object.errors.messages,
        success: 0
      }.to_json
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
