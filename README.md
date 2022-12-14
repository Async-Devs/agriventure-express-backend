![logo croped](https://user-images.githubusercontent.com/89589832/202859250-e40743a0-17fd-4d3a-a3b2-2bfe5b2665e6.png)


# Agriventure Express - Agriculture Marketplace


### Group members: 

  #### Group 5

* Costa M.R.R - 190112E
* Dasanayaka D.R.S.D - 190116U
* Dias A.G - 190137J

## Description:

In this project user can view agriculture data of the country, add agriculture data to the system. Also there is a marketplace for agriculture products where buyers can bid for crop yeilds.

## Directories:

This repository contains the following.
* controllers - Database access and methods of each database schema
* models - Database schemas
* routes - routers for each user types
* middleware - middleware folder include following files
  * authToken.js - Generate JWT tokens
  * producerAuthToken - check the validity of the JWT tokens and check the user type of the token is equal to 0
  * buyerAuthToken - check the validity of the JWT tokens and check the user type of the token is equal to 1
  * officerAuthToken - check the validity of the JWT tokens and check the user type of the token is equal to 2
  * adminAuthToken - check the validity of the JWT tokens and check the user type of the token is equal to 0
  * usersAuthToken - check the validity of the JWT tokens
  * publicUsersAuthToken - check the validity of the JWT tokens and check the user type of the token is equal to 0 or 1

## Prerequisites:

* Node JS
* NPM

## Install packages:

Direct into the folder which includes package.json and execute the command "npm install"

## User login details:

* Admin                           
       Username:-achira
       Password:-achira123
       
* Officer                           
       Username:-invader
       Password:-invader123
       
* Buyer                           
       Username:-supun
       Password:-supun123 
       
* Producer                           
       Username:-akilaI
       Password:-akilaI123 

## Links:

* The web application can be accessed through the link here: [https://agriventure-express.onrender.com](https://agriventure-express.onrender.com)
* Github link for the project source code (Frontend) : [https://github.com/Async-Devs/agriventure-express-web-frontend.git](https://github.com/Async-Devs/agriventure-express-web-frontend.git)
* Github link for the project source code (Backtend) : [https://github.com/Async-Devs/agriventure-express-backend.git](https://github.com/Async-Devs/agriventure-express-backend.git)
* Youtube link for the project demonstration : [https://youtu.be/3rK7GUOXp94](https://youtu.be/3rK7GUOXp94)
