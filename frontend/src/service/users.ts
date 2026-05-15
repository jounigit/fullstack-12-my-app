import type { User, CreateUserInput, UpdateUserInput } from '../types';
import config from '../utils/config';

const API_URL = config.API_URL // Use API_URL from config

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const getUser = async (id: string | number): Promise<User> => {
  const res = await fetch(`${API_URL}/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};

export const createUser = async (data: CreateUserInput): Promise<User> => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create user' }));
    throw new Error(err.error || 'Failed to create user');
  }
  return res.json();
};

export const updateUser = async (username: string, data: UpdateUserInput): Promise<User> => {
  const res = await fetch(`${API_URL}/users/${username}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
     },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update user' }));
    throw new Error(err.error || 'Failed to update user');
  }
  return res.json();
};

