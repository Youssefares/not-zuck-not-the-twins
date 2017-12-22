# frozen_string_literal: true

class CreateFriendships < ActiveRecord::Migration[5.1]
  def change
    create_table :friendships do |t|
      t.boolean :is_relationship_established, default:false
      t.belongs_to :user
      t.string :user_id
      t.string :friend_id
      t.timestamps
    end
  end
end
