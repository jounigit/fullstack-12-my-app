import { useParams } from 'react-router-dom';
import { getUser } from '../service/users';
import UserDetail from '../features/users/components/UserDetail';
import useSWR from 'swr';

export default function UserDetailPage() {
  const { id: joku } = useParams<{ id: string }>();
  const id = Number(joku);
  if (isNaN(id)) {
    throw new Error('Invalid user ID');
  }
  console.log('User HAHHAH: ', id);
  // const { username } = useParams<{ username: string }>();
  const { data: user } = useSWR(`/api/users/${id}`, 
    () => getUser(id));

  if (!user) return <p>User not found</p>;
  console.log('User all attributes: ', user);

  return <UserDetail user={user} />;
}

