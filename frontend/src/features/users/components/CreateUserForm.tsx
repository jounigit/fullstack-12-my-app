import { useActionState, useOptimistic, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserAction, type ActionState } from '../userActions';
import SubmitButton from '@components/SubmitButton';

export default function CreateUserForm() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticState, addOptimistic] = useOptimistic<ActionState, ActionState>(
    { error: null, success: false },
    (_, newState) => newState
  );

  const [state, formAction] = useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const result = await createUserAction(prevState, formData);
      addOptimistic(result);
      if (result.success) {
        formRef.current?.reset();
        setTimeout(() => navigate('/users'), 500);
      }
      return result;
    },
    { error: null, success: false }
  );

  const displayState = state.success ? state : optimisticState;

  return (
    <div>
      <h2>Create New User</h2>
      <form ref={formRef} action={formAction}>
        <div>
          <label htmlFor="username">Email (Username):</label>
          <input type="email" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <SubmitButton label="Create User" />
      </form>
      {displayState.error && <p style={{ color: 'red' }}>{displayState.error}</p>}
      {displayState.success && <p style={{ color: 'green' }}>User created successfully!</p>}
    </div>
  );
}

