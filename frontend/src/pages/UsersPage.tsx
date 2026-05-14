import { getUsers } from '../service/users';
// import UserList from '../features/users/components/UserList';
import useSWR from 'swr';

export default function UsersPage() {
  const { data: users, error, isLoading } = useSWR('/api/users', getUsers);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>Ei voitu hakea uuseria</p>;
  // if (!users || users.length === 0) return <p>No users found</p>;
  //   return (<div>
  //     <h1>Users</h1>
  //      <p>Users data: {JSON.stringify(users)}</p>
  //   </div>);

  // return <UserList users={users} />;
  return (<div>
  <h1>Users</h1>
  <p>This is the Users page. User list will be displayed here.</p>
</div>
  );
}

  