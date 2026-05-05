
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Blog App</h1>
        <nav>
          <a href="/users">Users</a>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="/users/:username" element={<UserDetailPage />} />
          <Route path="/users/:username/edit" element={<EditUserPage />} />
          <Route path="/" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
