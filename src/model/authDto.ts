export type AuthDto = {
  id: string;
  name: string;
  phoneNumber: string;
  region: string;
};

export type AuthResponse = {
  access_token: string;
  user: {
    id: string;
    name: string;
    type: string;
    roles: string[];
  };
};
