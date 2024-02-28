export interface Event {
  id: string | "";
  title: string;
  description: string;
  tickets: {
    types: {
      regular: {
        number: number;
        price: number;
      };
      vip: {
        number: number;
        price: number;
      };
    };
  };
  location: {
    venue: string;
    address: {
      address: string;
      county: string;
    };
  };
  dateOfEvent: string | "";
  time: {
    from: string;
    to: string;
  };
  isDeleted: boolean;
  deletedOn: string;
  createdAt: string;
  createdBy: string;
}

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  emailAddress: string;
}

export interface Ticket {
  id: string;
  ownerId: string;
  owner: string;
  eventId: string;
  eventName: string;
  type: "VIP" | "Regular";
  price: number;
  expiresBy: string;
  isDeleted: boolean;
  deleteddBy: string;
  deletedOn: string;
  isValid: string;
  createdAt: string;
  createdBy: string;
}
