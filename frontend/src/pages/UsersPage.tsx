
import UserList from '../features/users/components/UserList';
import { useUsers } from '../features/users/userHooks';

export default function UsersPage() {
  const { users } = useUsers();

  if (!users || users.length === 0) return <p>No users found</p>;

  return <UserList users={users} />;
}

  