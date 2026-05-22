import type { Blog, CreateBlogInput, UpdateBlogInput } from '../types';
import api from '../utils/axiosInstance';

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
  const res = await api.delete(`/blogs/${id}`);
  if (res.status !== 204) {
    throw new Error('Failed to delete blog');
  }
}
