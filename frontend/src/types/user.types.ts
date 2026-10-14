export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterInput {
  name: string;
  email: string;
  password?: string;
}

export interface ILoginInput {
  email: string;
  password?: string;
}

