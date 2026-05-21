import { getUsers } from '../service/users';
import UserList from '../features/users/components/UserList';
import useSWR from 'swr';

export default function UsersPage() {
  const { data: users } = useSWR('/api/users', getUsers);

  if (!users || users.length === 0) return <p>No users found</p>;

  return <UserList users={users} />;
}

  