import type { User, CreateUserInput, UpdateUserInput } from '../types';
import api from '../utils/axiosInstance';
import config from '../utils/config';

const API_URL = config.API_URL // Use API_URL from config

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>('/users');
  return data;
}

export async function getUser(id: number): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}

export async function createUser(data: CreateUserInput): Promise<User> {
  const { data: user } = await api.post<User>('/users', data);
  return user;
}

export function updateUser(username: string, data: UpdateUserInput): Promise<User> {
  return api.put<User>(`${API_URL}/users/${username}`, data).then(res => res.data);
}

export function deleteUser(username: string): Promise<void> {
  return api.delete(`${API_URL}/users/${username}`).then(() => {});
}


