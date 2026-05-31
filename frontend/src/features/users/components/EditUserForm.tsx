import { useActionState, useOptimistic, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserAction, type ActionState } from '../userActions';
import type { User } from '../../../types';
import SubmitButton from '../../../components/SubmitButton';

interface EditUserFormProps {
  user: User;
}

export default function EditUserForm({ user }: EditUserFormProps) {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticState, addOptimistic] = useOptimistic<ActionState, ActionState>(
    { error: null, success: false },
    (_, newState) => newState
  );

  const action = updateUserAction(user.username);

  const [state, formAction] = useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const result = await action(prevState, formData);
      addOptimistic(result);
      if (result.success && result.user && result.user.id) {
        setTimeout(() => navigate(`/users/${result.user?.id}`), 500);
      }
      return result;
    },
    { error: null, success: false }
  );

  const displayState = state.success ? state : optimisticState;

  return (
    <div>
      <h2>Edit User: {user.name}</h2>
      <form ref={formRef} action={formAction}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={user.name}
            required
          />
        </div>
        <SubmitButton label="Update User" />
      </form>
      {displayState.error && <p style={{ color: 'red' }}>{displayState.error}</p>}
      {displayState.success && <p style={{ color: 'green' }}>User updated successfully!</p>}
    </div>
  );
}

