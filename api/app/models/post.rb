# frozen_string_literal: true

class Post < ApplicationRecord
  default_scope { order(created_at: :desc) }
  belongs_to :user
  validates :body, presence: true
  validates :is_public, inclusion: { in: [true, false] }
end
