class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.text :body
      t.boolean :is_public
      t.belongs_to :user
      #add_foreign_key :posts, :users

      t.timestamps
    end
  end
end
