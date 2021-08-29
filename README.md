# schedule-meetings
Nodejs application to schedule meeting for people within specific chat rooms.
# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|       CORS                    | Cors accepted values                | "*"                                            |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


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
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:3000`

- API Document endpoints

  swagger Endpoint : http://localhost:3000/api-docs 


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | -------------------------------------------------------------------------------------------------|
| **node_modules**         | Contains all  npm dependencies                                                                   |
| **docs**                 | Contains  contract.json file, which includes API documentation                                   |
| **controllers**          | Controllers define functions to serve various express routes.                                    |
| **routes**               | Contain all express routes, separated by module/area of application                              |
| **models**               | Models define schemas that will be used in storing and retrieving data from Application database |
| **index.js**             | Entry point to express app                                                                       |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) | 

### Running the app
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description  |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on  index.js. Can be invoked with `npm start`                       |
