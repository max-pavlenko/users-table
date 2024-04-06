export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: UserType;
  id: string;
}

export enum UserType {
  Admin = 'Administrator',
  User = 'Regular',
}
