# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


youssef = User.create(name: 'Youssef', email: 'youssef@gmail.com')
essam = User.create(name: 'Essam', email: 'essam@gmail.com')
abdou = User.create(name: 'Abdelrahman', email: 'abdelrahman@gmail.com')

posts = Post.create([{body: "I am youssef", is_public: true, user_id: youssef.id},
					 {body: "I like potatoes", is_public: true, user_id: essam.id},
					 {body: "just one more test case", is_public: true, user_id: abdou.id}])
