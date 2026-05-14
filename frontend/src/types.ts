export interface Blog {
  id: number;
  title: string;
  author: string;
  url: string;
  likes?: number;
  year?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogInput {
  title: string;
  author: string;
  url: string;
  year?: number;
}

export interface UpdateBlogInput {
  likes: number;
}

export interface ReadingList {
  id: number;
  read: boolean;
  blogId: number;
  userId: number;
  blog?: Blog;
}

export interface User {
  id: number;
  username: string;
  name: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  blogs?: Blog[];
  readings?: ReadingList[];
}

export interface CreateUserInput {
  username: string;
  name: string;
  password: string;
}

export interface UpdateUserInput {
  name: string;
}

