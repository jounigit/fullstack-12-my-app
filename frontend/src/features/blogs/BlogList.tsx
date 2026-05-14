import type { Blog } from '../../types';

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  if (!blogs || blogs.length === 0) return <p>No blogs found</p>;

  return (
    <div>
      <h2>Blogs</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>URL</th>
            <th>Likes</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>
                <a href={blog.url} target="_blank" rel="noreferrer">
                  {blog.url}
                </a>
              </td>
              <td>{blog.likes ?? 0}</td>
              <td>{blog.year ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

