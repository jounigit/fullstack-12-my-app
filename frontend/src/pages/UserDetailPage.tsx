import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../service/users';
import UserDetail from '../features/users/components/UserDetail';
import type { User } from '../features/users/types';

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getUser(id)
      .then(setUser)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load user'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>User not found</p>;

  return <UserDetail user={user} />;
}

