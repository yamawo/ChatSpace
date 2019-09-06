# README

# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|
|name|string|null: false|
|email|string|null: false, add_index :users, :email, unique: true|
|password|string|null: false|

### Association
 - has_many :messages
 - has_many :groups, through: :groups_users