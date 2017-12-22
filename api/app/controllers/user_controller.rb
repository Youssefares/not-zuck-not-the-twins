class UserController < ApplicationController

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
end
