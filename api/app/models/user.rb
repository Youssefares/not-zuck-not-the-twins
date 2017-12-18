# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :rememberable
  include DeviseTokenAuth::Concerns::User
  has_many :PhoneNumber, dependent: :destroy
  enum gender: %i[ male female lesbians male_lesbians homosexual
     heterosexual bisexual prefer_not_to_specify] #we don't want to piss off emma watson
  enum relationship_status: %i[single married]
end
