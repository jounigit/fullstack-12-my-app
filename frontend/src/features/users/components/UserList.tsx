import { Link } from 'react-router-dom';
import type { User } from '../../../types';
import DeleteUser from './DeleteUser';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div>
      <h2>Users</h2>
      <Link to="/users/create">
        <button>Create New User</button>
      </Link>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.username}</td>
              <td>{user.blogs?.length ?? 0}</td>
              <td>
                <Link to={`/users/${user.id}/edit`}>
                  <button>Edit</button>
                </Link>
              </td>
              <td>
                <DeleteUser username={user.username} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

