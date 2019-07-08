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
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|name|text|null: false|
|email|text|

### Association
- has_many :group, through :member
- has_many :user
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false|
|group_name|text|

### Association
- has_many :user, through :member
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_id|integer|null: false|
|body|text|
|image|string|

### Association
- belongs_to :user
- belongs_to :group
