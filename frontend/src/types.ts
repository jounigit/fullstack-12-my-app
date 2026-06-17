// eslint-disable-next-line @typescript-eslint/no-unused-vars
const currentYear: number = new Date().getFullYear();

export type NumberInRange<Min extends number, Max extends number> = number & { __brand: `NumberInRange<${Min}, ${Max}>` };

export function isNumberInRange<Min extends number, Max extends number>(
  value: unknown,
  min: Min,
  max: Max
): value is NumberInRange<Min, Max> {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    throw new Error(`Expected an integer between ${min} and ${max}`);
  }
  if (value < min || value > max) {
    throw new Error(`Expected a number between ${min} and ${max}`);
  }
  return true;
}

export interface Blog {
  id: number;
  title: string;
  author: string;
  url: string;
  likes?: number;
  year?: NumberInRange<1991, typeof currentYear>;
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

export function isString(value: unknown): value is string {
  if (typeof value !== 'string') {
    throw new Error('Expected a string for username');
  }
  return typeof value === 'string';
}

