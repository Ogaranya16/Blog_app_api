Blog App
This is an api for a Blog app

Requirements
User should be able to register
User should be able to login  using JWT
Implement basic auth
User should be able to get articles
Users should be able to create articles
Users should be able to update and delete articles
Test application
Setup
Install NodeJS, mongodb
pull this repo
update env with example.env
run npm run start:dev
Base URL
somehostsite.com
Models
User
field	data_type	constraints
id	string	required
username	string	required
firstname	string	optional
lastname	string	optional
email	string	optional
password	string	required

Articles
field	data_type	constraints
id	string	required
timestamp	date	required
state	string	required,default:draft
tags	array	required
title	string	required unique
author	string	required
readcount	number	required
body	String	required
APIs
Signup User
Route: /signup
Method: POST
Body:
{
  "email": "lilmsbush@example.com",
  "password": "******",
  "firstname": "Tochi",
  "lastname": "Offiah",
  "username": "Msbush",
}
Responses
Success

{
    message: 'Signup successful',
    user: {
        "email": "lilmsbush@example.com",
        "password": "******",
        "firstname": "Tochi",
        "lastname": "Offiah",
        "username": 'Msbush",
    }
}
Login User
Route: /login
Method: POST
Body:
{
  "password": "******",
  "username": "Msbush",
}
Responses
Success

{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
Create Article
Route: /article
Method: POST
Header
Authorization: Bearer {token}

