# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  validates :body, presence: true
  validates :is_public, presence: true
end
