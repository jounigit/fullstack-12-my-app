import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../service/users';
import EditUserForm from '../features/users/components/EditUserForm';
import type { User } from '../features/users/types';

export default function EditUserPage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    getUser(username)
      .then(setUser)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load user'))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h1>Edit User</h1>
      <EditUserForm user={user} />
    </div>
  );
}

