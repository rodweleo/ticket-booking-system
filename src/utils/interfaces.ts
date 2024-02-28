export interface Event {
  id: string | "";
  title: string;
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
  dateOfEvent: string | "";
  time: {
    from: string;
    to: string;
  };
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
