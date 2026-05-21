
import { Routes, Route, Navigate, Outlet,  } from 'react-router-dom';
import './App.css'
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/useAuth';
import BlogsPage from './pages/BlogsPage';
import CreateBlogPage from './pages/CreateBlogPage';
import { QueryBoundaries } from './features/users/components/QueryBoundaries';
import React from 'react';
import { Toaster } from 'react-hot-toast';

function RequireAuth() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

function AppNav() {
  const { user, logout } = useAuth();
  return (
    <nav>
      <div><a href="/blogs">Blogs</a></div>
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
    <QueryBoundaries>
          <AuthProvider>
      <div className="app">
      <Toaster position="top-center" />
      <header>
        <h1>Blog App</h1>
        <AppNav />
      </header>
        
      <main>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/create" element={<CreateUserPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/users/:id" element={<UserDetailPage />} />
              <Route path="/users/:username/edit" element={<EditUserPage />} />
              <Route path="/blogs/create" element={<CreateBlogPage />} />
              {/* <Route path='/users/:id' element={<UserDetailPage />} /> */}
              <Route path="/" element={<Navigate to="/users" replace />} />
            </Route>
          </Routes>
        </React.Suspense>
      </main>
    </div>
    </AuthProvider>
    </QueryBoundaries>
  )
}

export default App
