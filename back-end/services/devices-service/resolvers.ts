import { v4 as uuidv4 } from "uuid";
import { devices } from "./mockData";


interface Device {
    id: string;
    name: string;
    device: string;
    accountId: string;
  }
  
  interface DeviceInput {
    name?: string;
    device: string;
    accountId: string;
  }


  export const resolvers = {
    Query: {
        devices: (): Device[] => devices,
      },

    Mutation: {
      createDevice: (parent: any, { input }: { input: { name: string; device: string, accountId: string } }) => {
       const newDevice: Device = {
          id: uuidv4(), 
          name: input.name,
          device: input.device,
          accountId: input.accountId,  // Link device to an account
        };
  
        devices.push(newDevice); 
        return newDevice;  
      },
    },
  };