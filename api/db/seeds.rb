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

Post.create!([{ body: 'I am youssef', is_public: true, user_id: 1 },
              { body: 'this is a private post for youssef', is_public: false, user_id: 1 },
              { body: 'I like potatoes', is_public: true, user_id: 1 },
              { body: 'this is a private post for essam', is_public: false, user_id: 2 },
              { body: 'just one more test case', is_public: true, user_id: 3 },
              { body: 'this is a private post for abdelrahman', is_public: false, user_id: 3 }])




