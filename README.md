# Accounts Application 

This application is designed to showcase how individuals' accounts are managed, displaying their associated devices. Users can create new accounts and devices, with the information instantly reflected on a table.

Within this technical task, my aim was to show how I can implement backend services, using Apollo Server with GraphQL. The frontend is simple, and has potential for improvements, this task shows how I have been able to build the services, and implement integration.

### Future Enhancements
- Expand GraphQL queries to handle more complex data.
- Integrate the "Add Device" mutation to allow users to add devices via the frontend, the mutation is built for this but needs integration.
- Improve Docker configuration to ensure smoother installation and deployment.
- Potentially refactor the backend to use Express.js for better handling of CORS and easier management of API routes.
- Instead of having a mock data file, connect the data to a database e.g. mongoDb for better data handling. 

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

- cd "fullstack-devices"

#### 2. Install Dependencies
Both the front-end and back-end require dependencies to be installed.

Backend

Navigate to the backend directory:

- cd back-end

Install the backend dependencies:
- npm install

This will install all the required packages listed in the package.json file, and the backend should be ready to run.

Frontend
Now create another terminal, and navigate to the front end directory: 

- cd front-end
  
Install the frontend dependencies:

- npm install

This will install all necessary dependencies for the frontend application.

#### 3. Run the Backend and Frontend Locally - these should both run in parallel.

Start the Frontend

As your currently in the front-end folder, start the React application by running:

- npm run dev

##### The frontend will now be running on http://localhost:3000.

Start the Backend

Select the backend terminal tab from before, and start the server by running:

- npm run dev
  
##### The backend will now be running on http://localhost:4000.


At this point, the frontend should be able to make requests to the backend, and you should see the application in action.

#### 4. Docker Setup (Optional)
If you prefer to run the entire application using Docker, there's a docker-compose.yml file set up. While the Docker configuration was still a work in progress, follow these steps to try running the app in containers:

Build and run the containers:

- docker-compose up --build

##### The frontend will be available on http://localhost:3000, and the backend will be running on http://localhost:4000.

Note: The Docker configuration isn't fully working at the moment and is working progress.

### GraphQL API
There are 2 services present: Accounts Service, and Devices Service. 

What to expect? 
- Fetch Queries for both services,
- Mutations for both services, - create new account with devices is shown within the frontend. Create new devices is just implemented on the backend.

Future improvements for queries/services: 
- I have built a create new Devices mutation, which allows users to add just new devices without creating a new account - this needs front end implementation.
- Build a edit functionality, where users can edit their devices/


The backend exposes a GraphQL API through Apollo Server. Below is an example of how you can interact with the API using Apollo Client in the frontend.

#### Accounts Service

If testing on Apollo Playground: http://localhost:4001 - this will test the account service: you can create new accounts or fetch new accounts 

The frontend can query accounts and devices using the following GraphQL query:

Fetch all accounts 

 ````
  query GetAccounts {
    accounts {
      id
      name
      email
      devices {
        id
        name
        device
      }
    }
  }

````

Example GraphQL Mutation: 

##### Create a new account with devices 

 ````
  mutation CreateAccount($input: AccountInput!) {
    createAccount(input: $input) {
      id
      name
      email
      devices {
        device
      }
    }
  }
  ````
Input could be along the lines of: 


```
{
  "input": {
    "name": "John Doe", 
    "email": "john@example.com", 
    "devices": {
      "device": "Apple Watch"
    }
}
}
```

#### Device queries 

If testing on Apollo Playground: http://localhost:4002 - this will test the devices service: you can create new devices or fetch new accounts 

Fetch all devices: 

````
  query GetDevices {
    devices {
      id
      name
      device
    }
  }

````

##### Create a new device 

````
 mutation CreateDevice($input: DeviceInput!) {
    createNewDevice(input: $input) {
      id
      name
      device
    }
  }
````

Input could be along the lines of: 

```
{
  "input": {
    "name": "John Doe",
    "device": "Speakers"
}
}
```

