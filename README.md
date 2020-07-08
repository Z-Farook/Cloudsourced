# Cloudsourced

![Frontend](https://github.com/elertan/cloudsourced/workflows/Frontend/badge.svg)
![Backend](https://github.com/elertan/cloudsourced/workflows/Backend/badge.svg)

CloudSourced brings releasing software components to another level. Cloudsourced is used to outsource the building of software components by projectmanagers and creates a link between components and programmers.

### Getting Started

To get started with running the application on your machine, there are the following requirements.

You need to have the following installed on your machine:
- Docker
- docker-compose
- Java JDK >=v11 (We have used v11 and above during development)
- NPM & NodeJS (NodeJS >= v12 automatically installs atleast NPM v5 with the node installer)

To run the application on your machine you need:
- Port 3000 and 5000 to be available

#### Steps to get application running
1. Clone this repository on your machine
2. Navigate to this repository in your terminal/command prompt
3. Copy the file named .env.example and paste it back as .env
4. OPTIONAL: Edit the contents of the env file to configure the database
5. Execute the following command
`$ docker-compose up -d `
6. Navigate to the file `application.properties.example` under `./backend/src/main/resources/`
7. Copy the file `application.properties.example` and paste it back as `application.properties`
8. OPTIONAL: Edit the contents of the `application.properties` file to configure the backend application (if you had changed the example env file make sure the database connection information is correct)
9. Run the Backend by using your Java IDE of choice
10. Open a new terminal window and navigate to `./frontend`
11. Run the command `$ npm start` to start the frontend application. Your browser should open and take you the application.
