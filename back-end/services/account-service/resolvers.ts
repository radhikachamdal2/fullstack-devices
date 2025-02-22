import { v4 as uuidv4 } from "uuid";
import { accounts } from "./mockData";
import { devices } from "../devices-service/mockData";

interface Device {
  id: string;
  name?: string;
  device: string;
  accountId?: string;
}

interface Account {
  id: string;
  name: string;
  email: string;
  devices?: Device[];
}

interface AccountInput {
  name: string;
  email: string;
  devices?: { name?: string; device: string }[];
}


export const resolvers = {
    Query: {
      accounts: () => accounts,  // Returns all accounts
    },
  
    Account: {
      devices: (parent: any) => {
        // Return devices linked to the account by accountId
        return devices.filter(device => device.accountId === parent.id);
      },
    },
  
    Mutation: {
      createAccount: (parent: any, { input }: { input: { name: string; email: string; devices: {name: string; device: string}[]} }) => {
        const newAccount = {
          id: uuidv4(), 
          name: input.name,
          email: input.email,
        };
  
        accounts.push(newAccount); 
  
        const createdDevices = input.devices.map((deviceInput) => {
          const newDevice = {
            id: uuidv4(),
            name: deviceInput.name,
            device: deviceInput.device,
            accountId: newAccount.id,
          };
          devices.push(newDevice);
          return newDevice;
        })
  
        return {...newAccount, devices: createdDevices}
      },
    },
  };