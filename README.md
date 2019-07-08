# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructio

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false, index: true|
|email|text|

### Association
- has_many :groups, through: :members
- has_many :user
- has_many :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|

### Association
- has_many :user, through: :member
- has_many :members
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|refernces|null: false, foreign_key: true|
|group_id|refernces|null: false,  foreign_key: true|
|body|text|
|image|string|

### Association
- belongs_to :user
- belongs_to :group
