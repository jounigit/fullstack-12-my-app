import { Link } from 'react-router-dom';
import type { User  } from '../../../types';

interface UserDetailProps {
  user: User
}

export default function UserDetail({ user }: UserDetailProps) {
  return (
    <div style={{ backgroundColor: '#000000', marginTop: '40px', paddingTop: '20px'}}>
      <h2>{user.name} {user.id}</h2>
      <p>Username: {user.username}</p>
      <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>

      <h3>Blogs</h3>
      {user.blogs && user.blogs.length > 0 ? (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.title}
              </a>{' '}
              by {blog.author} ({blog.likes} likes)
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs</p>
      )}

      {user.readings && user.readings.length > 0 && (
        <>
          <h3>Reading List</h3>
          <ul>
            {user.readings.map((reading) => (
              <li key={reading.id}>
                {reading.blog?.title} — {reading.read ? 'Read' : 'Unread'}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* <Link to={`/users/${user.username}/edit`}>
        <button>Edit</button>
      </Link> */}
      <Link to="/users">
        <button>Back to Users</button>
      </Link>
    </div>
  );
}

