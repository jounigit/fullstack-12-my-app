import { Link } from 'react-router-dom';
import type { Blog } from '../../../types';
import DeleteBlog from './DeleteBlog';
import EditBlog from './EditBlog';
import '../../../App.css';

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  if (!blogs || blogs.length === 0) return <p>No blogs found</p>;

  return (
    <div>
      <h2>Blogs</h2>
      {/* <div style={{ marginBottom: '20px' }}>
        Test väärä päivitys, joka ei onnistu:
        <EditBlog id={999} />
      </div> */}
      <Link to="/blogs/create">
        <button>Create New Blog</button>
      </Link>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>URL</th>
            <th>Likes</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} style={{ paddingTop: '40px', paddingBottom: '40px' }}>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>
                <a href={blog.url} target="_blank" rel="noreferrer">
                  {blog.url}
                </a>
              </td>
              <td>
                <EditBlog id={blog.id} />
                </td>
              <td>{blog.year ?? '-'}</td>
              <td>
                  <DeleteBlog id={blog.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

