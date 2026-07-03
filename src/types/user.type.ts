export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserSearchItem {
  _id: string;

  name: string;

  email: string;

  avatarUrl?: string;
}