# ToDo List Full-Stack Web Based App
Opens a web app that allows users to create an account and login to a to do list where basic CRUD operations can be performed such as adding and removing tasks from a list.

# Requirements
- Java 17+ (OpenJDK)
- Gradle (supplied via Gradle Wrapper)
- Docker
- Node.js
- React (should install through npm command if you dont have it already)
- PostgreSQL (supplied through Docker)

# Instructions

- After Cloning Repo Open Two Terminal/Command Line Windows
- Navigate to Project Root Folder in both windows
- In one window run 


       docker-compose up -d
 
- In the other window navigate to the frontend folder and run:
  


      npm install
      npm start

## After done using the app
- Terminate the frontend window (Ctrl+C or Close Window)
  
- To stop Docker services from running:
  

       docker-compose down


# Troubleshooting:
App should run using image and jar files that I stored in the project folder, but if for some reason it doesnt you may have to generate your own. 
- To do so run the below commands in the project root folder, then repeat the above run instructions:

       ./gradlew clean build
       ./gradlew clean bootJar

or use gradlew.bat in place of ./gradlew if using command prompt in windows.






