
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css'
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/useAuth';

function RequireAuth() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

// function LogOutUser() {
//   const { logout } = useAuth();
//   return (
//     <div>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }

function AppNav() {
  const { user, logout } = useAuth();
  return (
    <nav>
      <div><a href="/users">Users</a></div>
      {user ? (
        <>
          <div> | {user.name} | </div>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="app">
      <header>
        <h1>Blog App</h1>
        <AppNav />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/users/:username" element={<UserDetailPage />} />
            <Route path="/users/:username/edit" element={<EditUserPage />} />
            <Route path="/" element={<Navigate to="/users" replace />} />
          </Route>
        </Routes>
      </main>
    </div>
    </AuthProvider>
  )
}

export default App
