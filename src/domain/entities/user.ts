export type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: Date;
};

export type UserCredentials = {
  email: string;
  password: string;
};
