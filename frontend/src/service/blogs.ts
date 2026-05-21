import type { Blog, CreateBlogInput, UpdateBlogInput } from '../types';
// import config from '../utils/config';
import api from '../utils/axiosInstance';

// const API_URL = config.API_URL; // Use API_URL from config

// const getBearerToken = (): string => {
//   const token = localStorage.getItem('auth_token');
//   return token ? `Bearer ${token}` : '';
// }

export async function getBlogs(): Promise<Blog[]> {
  const { data } = await api.get<Blog[]>('/blogs');
  return data;
}

export async function getBlog(id: string | number): Promise<Blog> {
  const { data } = await api.get<Blog>(`/blogs/${id}`);
  return data;
}

export async function createBlog(data: CreateBlogInput): Promise<Blog> {
  const { data: blog } = await api.post<Blog>('/blogs', data);
  return blog;
}

export async function updateBlog(id: string | number, data: UpdateBlogInput): Promise<Blog> {
  const { data: blog } = await api.put<Blog>(`/blogs/${id}`, data);
  return blog;
}

export async function deleteBlog(id: string | number): Promise<void> {
  await api.delete(`/blogs/${id}`);
}

// export const getBlogs = async (): Promise<Blog[]> => {
//   const res = await fetch(`${API_URL}/blogs`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch blogs');
//   }
//   return res.json();
// }

// export const createBlog = async (data: CreateBlogInput): Promise<Blog> => {
//   const res = await fetch(`${API_URL}/blogs`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json',
//         'Authorization': getBearerToken()
//      },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) {
//     console.error('Failed to create blog:', res.status, res.statusText);
//     const err = await res.json().catch(() => ({ error: 'Failed to create blog' }));
//     throw new Error(err.error || 'Failed to create blog');
//   }
//   return res.json();
// }

// export const updateBlog = async (id: string | number, data: UpdateBlogInput): Promise<Blog> => {
//   const res = await fetch(`${API_URL}/blogs/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json',
//         'Authorization': getBearerToken()
//      },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) {
//     const err = await res.json().catch(() => ({ error: 'Failed to update blog' }));
//     throw new Error(err.error || 'Failed to update blog');
//   }
//   return res.json();
// }

// export const deleteBlog = async (id: string | number): Promise<void> => {
//   const res = await fetch(`${API_URL}/blogs/${id}`, {
//     method: 'DELETE',
//     headers: { 'Authorization': getBearerToken() },
//   });
//   if (!res.ok) {
//     const err = await res.json().catch(() => ({ error: 'Failed to delete blog' }));
//     throw new Error(err.error || 'Failed to delete blog');
//   }
// }