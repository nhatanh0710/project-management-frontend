export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
}

export interface UserSearchItem {
  _id: string;

  name: string;

  email: string;

  avatar_url?: string;
}