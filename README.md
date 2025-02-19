# Account - Devices 

# This is application which shows the accounts of individuals with their devices. The application allows users to create new accounts and devices and this will show onto the table instantly. 

The application as a whole is simple, I wanted to showcase in particular how I was able to upskill and build the backend service, there are areas for improvement with the front end, and backend. 

To Build: 
Frontend: React application that communicates with the backend through GraphQL.
Backend: Node.js with Apollo Server, exposing a GraphQL API.
The backend consists of multiple microservices, including a GraphQL Gateway that federates data from multiple services.

Technologies Used: 
Frontend: React, Apollo Client, NextJs 
Backend: Node.js, Apollo Server, GraphQL
Docker: For containerization of the backend and frontend
GraphQL Federation: Apollo Server for federated GraphQL services

There are dockerfiles within the application, but due to some difficulty I was not able to get this running. 

To run locally
Clone the repo, to a place where you'd like to store
Run in VS code or editor of choice

Run the backend services 
Within the terminal, cd into "back-end" and run the command "npm install" you should see that the port will run on http://localhost:4000

Run the front end 
Then cd back to the root which is "fullstack-app" and cd into "front-end" and run the command "npm install" you should see that the port will run on http://localhost:3000
From then all the dependencies should be installed
Finally run "npm run dev"





