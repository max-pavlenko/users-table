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
  ADMIN = 'Administrator',
  USER = 'Regular',
}
