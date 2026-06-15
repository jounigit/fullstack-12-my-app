import { useParams } from 'react-router-dom';
import { getUser } from '../service/users';
import EditUserForm from '../features/users/components/EditUserForm';
import useSWR from 'swr';
import { isString } from '../types';

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  isString(id); // Ensure id is a string for SWR key and getUser function
  const { data: user, error, isLoading } = useSWR(`/api/users/${id}`, () => getUser(Number(id)));

  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h1>Edit User</h1>
      <EditUserForm user={user} />
    </div>
  );
}

