
import { useBlogs } from '../features/blogs/blogHooks';
import BlogList from '../features/blogs/components/BlogList';

export default function BlogsPage() {
  const { blogs } = useBlogs();

  if (!blogs || blogs.length === 0) return <p>No blogs found</p>;

  return <BlogList blogs={blogs} />;
}