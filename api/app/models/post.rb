# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  validates :body, presence: true
  validates :is_public, :inclusion => {:in => [true, false]}
end
