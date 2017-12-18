class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.text :body
      t.boolean :is_public, default: true, null: false
      t.belongs_to :user

      t.timestamps
    end
  end
end
