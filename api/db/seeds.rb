<<<<<<< HEAD
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# frozen_string_literal: true

User.create!(
  [
    { email: 'youssef@y.com', name: 'youssef',
      password: '12345678', password_confirmation: '12345678' },
    { email: 'essam@y.com', name: 'essam',
      password: '12345678', password_confirmation: '12345678' },
    { email: 'abdelrahman@y.com', name: 'abdelrahman',
      password: '12345678', password_confirmation: '12345678' }
  ]
)

posts = Post.create([{body: "I am youssef", is_public: true, user_id: 2},
					 {body: "I like potatoes", is_public: true, user_id: 3},
					 {body: "just one more test case", is_public: true, user_id: 4}])