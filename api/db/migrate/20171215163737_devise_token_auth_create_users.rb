# frozen_string_literal: true

class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table(:users) do |t|
      ## Required
      # t.has_many :phone_numbers
      t.string :provider, null: false, default: 'email'
      t.string :uid, null: false, default: ''

      ## Database authenticatable
      t.string :encrypted_password, null: false, default: ''

      ## Rememberable
      t.datetime :remember_created_at

      ## User Info
      t.string :name
      t.string :nickname
      t.string :image
      t.string :email
      t.string :last_name
      t.integer :gender
      t.datetime :birthdate
      t.string :hometown
      t.integer :relationship_status #Yeah people can be in a relationship, yet not married, get over it
      t.string :about
      ## Tokens
      t.text :tokens

      t.timestamps
    end

    add_index :users, :email,                unique: true
    add_index :users, %i[uid provider],      unique: true
  end
end
