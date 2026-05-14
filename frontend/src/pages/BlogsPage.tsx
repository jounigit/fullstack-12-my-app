import { getBlogs } from '../service/blogs';
import BlogList from '../features/blogs/BlogList';
import useSWR from 'swr';

export default function BlogsPage() {
  const { data: blogs, error, isLoading } = useSWR('/api/blogs', getBlogs);

  if (isLoading) return <p>Loading blogs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!blogs || blogs.length === 0) return <p>No blogs found</p>;

  return <BlogList blogs={blogs} />;
}