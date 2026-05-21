import { getBlogs } from '../service/blogs';
import BlogList from '../features/blogs/components/BlogList';
import useSWR from 'swr';

export default function BlogsPage() {
  const { data: blogs } = useSWR('/api/blogs', getBlogs, { suspense: true });

  if (!blogs || blogs.length === 0) return <p>No blogs found</p>;

  return <BlogList blogs={blogs} />;
}