import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useActionState, useOptimistic, useRef } from 'react';
import type { ActionState } from '../features/users/userActions';

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const { login } = useAuth();

  const [optimisticState, addOptimistic] = useOptimistic<ActionState, ActionState>(
    { error: null, success: false },
    (_, newState) => newState
  );

  const [state, formAction] = useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;

      try {
        await login(username, password);
        addOptimistic({ error: null, success: true });
        formRef.current?.reset();
      } catch (err) {
        addOptimistic({
          error: err instanceof Error ? err.message : 'Login failed',
          success: false,
        });
      }

      return prevState; // We don't need to update state here since we're using optimistic updates
    },
    { error: null, success: false }
  );

  const displayState = state.success ? state : optimisticState;
  const error = displayState.error;
  

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
      <h2>Login</h2>
      <form ref={formRef} action={formAction}>
        <div>
          <label htmlFor="username">Email (Username):</label>
          <input type="email" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
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

// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();

//   const handleSubmit = async (e: React.SubmitEvent) => {
//     e.preventDefault();
//     try {
//       setError('');
//       await login(username, password);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Login failed');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <p>
//         Don't have an account? <Link to="/users/create">Sign up</Link>
//       </p>
//     </div>
//   );
// }

