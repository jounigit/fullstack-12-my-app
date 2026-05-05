import { useEffect, useState } from 'react';
import { getUsers } from '../service/users';
import UserList from '../features/users/components/UserList';
import type { User } from '../features/users/types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return <UserList users={users} />;
}


// ######## koe ############
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const data = await getUsers();
//         setUsers(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to load users');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);
  