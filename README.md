# Csordaszellem
This portfolio project encompasses a real-time, multi-device board game application, primarily intended for private use. The application's current backend is hosted on a JSON server, which leads to a critical limitation: the absence of bidirectional communication between the frontend and backend. This issue adversely impacts the game's logic, necessitating rectification through either a server switch or improved frontend logic.

## Starting the Application
Important: To start the application, it is essential to initiate the server with the command json-server --watch db.json. This step is crucial for the proper functionality of the application.

## Development Server
Execute ng serve to run the development server. Visit http://localhost:4200/ to access the application. The application is configured for automatic reloading following any modifications to the source files.

## Code Scaffolding
Utilize ng generate component component-name to generate a new component. Other scaffolding commands include ng generate directive|pipe|service|class|guard|interface|enum|module, offering comprehensive options for development.

## Building the Project
Use ng build to compile the project. The build artifacts will be stored in the dist/ directory.

## Executing Unit Tests
Run ng test to conduct unit tests via Karma.

## Conducting End-to-End Tests
For end-to-end testing, use ng e2e. This command requires prior installation of a package supporting end-to-end testing capabilities.

## Additional Assistance
For more information and assistance on the Angular CLI, consult ng help or visit the Angular CLI Overview and Command Reference page.