import { getUsers } from '../service/users';
import UserList from '../features/users/components/UserList';
import useSWR from 'swr';

export default function UsersPage() {
  const { data: users, error, isLoading } = useSWR('/api/users', getUsers);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!users || users.length === 0) return <p>No users found</p>;

  return <UserList users={users} />;
}

  