export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
};

export type UserCredentials = {
  email: string;
  password: string;
};
