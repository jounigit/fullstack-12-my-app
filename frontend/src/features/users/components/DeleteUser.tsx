import { useSWRConfig } from 'swr';
import { deleteUser } from '../../../service/users';
import { useNavigate } from 'react-router-dom';

interface DeleteUserProps {
  username: string;
}

export default function DeleteUser({ username }: DeleteUserProps) {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

      await deleteUser(username);
      alert('User deleted successfully');
      mutate('/api/users'); // Refresh the list of users
      setTimeout(() => {
        navigate('/users');
      }, 500);

  };

  return (
    <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
      Delete User
    </button>
  );
}