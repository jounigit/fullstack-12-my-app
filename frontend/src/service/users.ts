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

// export const getUsers = async (): Promise<User[]> => {
//   const res = await fetch(`${API_URL}/users`);
//   if (!res.ok) throw new Error('Failed to fetch users');
//   return res.json();
// };

// export const getUsers = async (): Promise<User[]> => {
//   const res = await fetch(`${API_URL}/users`);
//   if (!res.ok) throw new Error('Failed to fetch users');
//   return res.json();
// };

// export const getUser = async (id: string | number): Promise<User> => {
//   const res = await fetch(`${API_URL}/users/${id}`);
//   if (!res.ok) throw new Error('Failed to fetch user');
//   return res.json();
// };

// export const createUser = async (data: CreateUserInput): Promise<User> => {
//   const res = await fetch(`${API_URL}/users`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) {
//     const err = await res.json().catch(() => ({ error: 'Failed to create user' }));
//     throw new Error(err.error || 'Failed to create user');
//   }
//   return res.json();
// };

// export const updateUser = async (username: string, data: UpdateUserInput): Promise<User> => {
//   const res = await fetch(`${API_URL}/users/${username}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
//      },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) {
//     const err = await res.json().catch(() => ({ error: 'Failed to update user' }));
//     throw new Error(err.error || 'Failed to update user');
//   }
//   return res.json();
// };

