export interface ICustomer {
  _id?: string;
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  preferences?: {
    preferredCarriers: string[];
    shippingMethods: string[]; // Should include "Sea" as an option
    preferredPorts: {
      originPort: string;
      destinationPort: string;
    }[];
  };
  role?: 'Customer',
  password?: string;
}