import type { Blog, CreateBlogInput, UpdateBlogInput } from '../types';
import config from '../utils/config';

const API_URL = config.API_URL; // Use API_URL from config

export const getBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(`${API_URL}/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

export const getBlog = async (id: string | number): Promise<Blog> => {
  const res = await fetch(`${API_URL}/blogs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
}

export const createBlog = async (data: CreateBlogInput): Promise<Blog> => {
  const res = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create blog' }));
    throw new Error(err.error || 'Failed to create blog');
  }
  return res.json();
}

export const updateBlog = async (id: string | number, data: UpdateBlogInput): Promise<Blog> => {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update blog' }));
    throw new Error(err.error || 'Failed to update blog');
  }
  return res.json();
}