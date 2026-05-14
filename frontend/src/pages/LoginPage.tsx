import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

// const API_URL = 'http://localhost:3001/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      setError('');
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
    // try {
    //   setError('');
    //   // await login(username, password);
    //   const response = await fetch(`${API_URL}/login`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   if (!response.ok) {
    //     const err = await response.json().catch(() => ({ error: 'Login failed' }));
    //     throw new Error(err.error || 'Login failed');
    //   }

    //   const { token, user } = await response.json();
    //   // Handle successful login (e.g., store token, redirect)
    //   console.log('LOGIN RESPONSE:: ', { token, user });
      
    //   localStorage.setItem('auth_token', token);
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : 'Login failed');
    // }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Don't have an account? <Link to="/users/create">Sign up</Link>
      </p>
    </div>
  );
}

