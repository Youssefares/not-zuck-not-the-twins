# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: %i[index show create update destroy]
  before_action :check_authority, only: %i[create update destroy]

  # GET /posts
  def index
    if current_user.id != @requested_user.id && !current_user.isfriends_with(@requested_user.id)
      @posts = @requested_user.posts.where(is_public: true)
    else
      @posts = @requested_user.posts
    end

    render json: @posts
  end

  # GET /posts/1
  def show
    @post = @requested_user.posts.find(params[:id])
    if current_user.id != @requested_user.id && !current_user.isfriends_with(@requested_user.id) && !@post.is_public
      render status: 401, json: { message: 'unauthorized' }
    elsif !@post.present?
      render status: 401, json: { message: 'unauthorized' }
    else
      render json: @post
    end
  end

  # POST /posts
  def create
    @post = current_user.posts.build(post_params)

    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if current_user.posts.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    current_user.posts.find(params[:id]).destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @requested_user = User.find(params[:user_id].to_i)
  end

  def check_authority
    if current_user.id != params[:user_id].to_i
      render status: 401, json: { message: 'unauthorized' }
    end
  end

  # Only allow a trusted parameter "white list" through.
  def post_params
    params.permit(:body, :is_public)
  end
end
