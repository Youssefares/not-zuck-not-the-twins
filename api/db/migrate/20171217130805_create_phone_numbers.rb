# frozen_string_literal: true
class CreatePhoneNumbers < ActiveRecord::Migration[5.1]
  def change
    create_table :phone_numbers do |t|
      t.string :user_id
      t.string :number

      t.timestamps
    end
  end
end
