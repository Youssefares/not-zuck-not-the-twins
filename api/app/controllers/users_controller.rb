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
    render json: @users
  end

  def feed
    @feed = []
    @user = User.find(params[:user_id])
    @user.friendships.each do |friendship|
      if friendship.is_relationship_established
        @feed = @feed + Post.where(user_id: friendship.friend_id, is_public: true) # TODO: merge arrays without making new copies
      end
    end

    @feed.sort!  {|a,b| b.updated_at <=> a.updated_at}
  
    render json: @feed
  end

end
