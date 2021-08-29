# schedule-meetings
Nodejs application to schedule meeting for people within specific chat rooms.

# Types of meetings
- **BasicMeeting** : ROOMS[R1,R2,R3,R4,R5], PEOPLE[P1,P2,P3,P4,P5]  are only available resources to schedule meeting, overlapping of scheduled meetings Rooms are detected.
- **AdvanceMeeting** : ROOMS[R1,R2,R3,R4,R5], PEOPLE[P1,P2,P3,P4,P5]  are only available resources to schedule meeting, overlapping of resources are detecting and handled properly.

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|       CORS                    | Cors accepted values                | "*"                                            |

## [Stack](#stack)

<!-- FEATURES:START -->
- **NoSQL database**: [MongoDB](https://www.mongodb.com/) object data modeling using [Mongoose](https://mongoosejs.com/)
- **Express** : [ExpressJs](http://expressjs.com/) framework based on nodejs
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **moment** [MomentJS](https://momentjs.com/) data manuplation library.
<!-- FEATURES:END -->

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version LTS


# Getting started
- Clone the repository
```
git clone  https://github.com/chetanGH/schedule-meetings.git
```
- Install dependencies
```
cd schedule-meetings
npm install

```
- Run the project
```
npm start
```
  Navigate to `http://localhost:3000`

- API Document endpoints

  swagger Endpoint : http://localhost:3000/api-docs 


## [API Documentation](#api-documentation)

To view all APIs and learn all the details required for the requests and responses, run the server and go to http://localhost:3000/api-docs/ in your browser. [Swagger](https://swagger.io/) automatically creates this page by using the definitions and descriptions written as comments in the required files.

### API Endpoints

List of available routes:  
  
**Routes**:
- Creating Basic Meeting - POST /api/basicMeeting
- Creating Advanced Meeting - POST /api/createAdvancedMeeting
## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | -------------------------------------------------------------------------------------------------|
| **dist**                 | Folder contains Angular static build files to render UserInterface[More Info](https://github.com/chetanGH/MeetingSchedule-Client) |
| **node_modules**         | Contains all  npm dependencies                                                                   |
| **docs**                 | Contains  contract.json file, which includes API documentation                                   |
| **controllers**          | Controllers define functions to serve various express routes.                                    |
| **routes**               | Contain all express routes, separated by module/area of application                              |
| **models**               | Models define schemas that will be used in storing and retrieving data from Application database |
| **index.js**             | Entry point to express app                                                                       |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) | 

### Running the app
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description  |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on  index.js. Can be invoked with `npm start`                       |


**THANK YOU!**
