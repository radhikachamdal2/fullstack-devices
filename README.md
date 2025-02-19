# Accounts Application 

This application is designed to showcase how individuals' accounts are managed, displaying their associated devices. Users can create new accounts and devices, with the information instantly reflected on a table.

The primary goal of this project was to demonstrate how I could build a backend service using Apollo Server with GraphQL and explore Docker containerization. While the frontend and backend work, there is potential for future improvements, particularly in integrating the backend services with the frontend more effectively.

### Future Enhancements
- Expand GraphQL queries to handle more complex data.
- Integrate the "Add Device" mutation to allow users to add devices via the frontend.
- Improve Docker configuration to ensure smoother installation and deployment.
- Potentially refactor the backend to use Express.js for better handling of CORS and easier management of API routes.

### Technologies Used
Frontend:
- React, Apollo Client, Next.js
Backend:
- Node.js, Apollo Server, GraphQL

Containerization:
- Docker for running both the frontend and backend in isolated containers

GraphQL Federation:
- Apollo Server for federating GraphQL services

Prerequisites
- Before running the application locally, make sure you have the following installed:

- Node.js (preferably v16 or higher)
- npm (comes with Node.js)
- Docker (for containerization)

### Installation

#### 1. Clone the Repository

First, clone the repository to your local machine:

- git clone "https...."

- cd "fullstack-app"

#### 2. Install Dependencies
Both the frontend and backend require dependencies to be installed.

Backend

Navigate to the backend directory:

- cd back-end

Install the backend dependencies:
- npm install

This will install all the required packages listed in the package.json file, and the backend should be ready to run.

 Frontend
Now, navigate back to the root of the project and then to the frontend directory:

- cd ../front-end
  
Install the frontend dependencies:

- npm install

This will install all necessary dependencies for the frontend application.

#### 3. Run the Backend and Frontend Locally

Start the Backend

In the back-end folder, start the server by running:

- npm run dev
  
##### The backend will now be running on http://localhost:4000.

Start the Frontend

In the frontend folder, start the React application:

- npm run dev

##### The frontend will now be running on http://localhost:3000.

At this point, the frontend should be able to make requests to the backend, and you should see the application in action.

#### 4. Docker Setup (Optional)
If you prefer to run the entire application using Docker, there's a docker-compose.yml file set up. While the Docker configuration was still a work in progress, follow these steps to try running the app in containers:

Build and run the containers:

- docker-compose up --build

##### The frontend will be available on http://localhost:3000, and the backend will be running on http://localhost:4000.

Note: The Docker configuration isn't fully working at the moment and is working progress.

### GraphQL API
- The backend exposes a GraphQL API through Apollo Server. Below is an example of how you can interact with the API using Apollo Client in the frontend.

- Example GraphQL Query
- GraphQL Query for Fetching Accounts

The frontend can query accounts and devices using the following GraphQL query:

query GetAccounts {
  accounts {
    id
    name
    devices {
      id
      name
    }
  }
}

This will fetch all the accounts and the devices linked, this is the view on page load.

Example GraphQL Mutation
- Mutation for Adding a Device:

You can add new devices with a mutation like:

  mutation CreateAccount($input: AccountInput!) {
    createAccount(input: $input) {
      id
      name
      email
    }
  }

Your input could look like name: "Joe" email: "joe@.com when on the frontend. 

After clicking submit, have a look in the network tab to see the input! 

Mutation Call in the Frontend after clicking on the dialog - "create new devices"


