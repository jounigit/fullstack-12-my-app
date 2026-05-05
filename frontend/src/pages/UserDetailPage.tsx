import { useParams } from 'react-router-dom';
import { getUser } from '../service/users';
import UserDetail from '../features/users/components/UserDetail';
import useSWR from 'swr';

export default function UserDetailPage() {
  // const { id } = useParams<{ id: string }>();
  const { username } = useParams<{ username: string }>();
  const { data: user, error, isLoading } = useSWR(`/api/users/${username}`, () => getUser(username));

  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>User not found</p>;

  return <UserDetail user={user} />;
}

