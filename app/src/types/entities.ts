export interface IUser {
  id: string;
  username: string;
  email: string;
  isPrivate: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface IList {
  id: string;
  name: string;
  image: string;
  type: string;
  itemsCount?: number;
  published: boolean;
  userId: string;
  views: string;
  description: string;
  updatedAt: string;
  createdAt: string;
}
