class PostsController < ApplicationController
  before_action :set_user, only: [:index, :show, :create, :update, :destroy]

  # GET /posts
  def index
    @posts = @user.posts

    render json: @posts
  end

  # GET /posts/1
  def show
  	@post = @user.posts.find(params[:id])
    render json: @post
  end

  # POST /posts
  def create
    @post = @user.posts.build(post_params)

    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @user.posts.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @user.posts.find(params[:id]).destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:user_id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.permit(:body, :is_public)
    end
end
