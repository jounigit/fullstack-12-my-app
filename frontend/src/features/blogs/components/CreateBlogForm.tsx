import { useActionState, useOptimistic, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../../components/SubmitButton';
import { createBlogAction, type ActionState } from '../blogActions';

export default function CreateBlogForm() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const currentYear = new Date().getFullYear();

  const [optimisticState, addOptimistic] = useOptimistic<ActionState, ActionState>(
    { error: null, success: false },
    (_, newState) => newState
  );

  const [state, formAction] = useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const result = await createBlogAction(prevState, formData);
      addOptimistic(result);
      if (result.success) {
        // setTimeout(() => addOptimistic({ error: null, success: false }), 3000);
        formRef.current?.reset();
        setTimeout(() => navigate('/blogs'), 800);
      }
      return result;
    },
    { error: null, success: false }
  );

  const displayState = state.success ? state : optimisticState;

  return (
    <div>
      <h2>Create New Blog</h2>
      <form ref={formRef} action={formAction}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>

        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
        </div>

        <div>
          <label htmlFor="url">URL:</label>
          <input type="url" id="url" name="url" required />
        </div>

        <div>
          <label htmlFor="year">Year (optional):</label>
          <input type="number" id="year" name="year" min={1991} max={currentYear} />
        </div>

        <SubmitButton label="Create Blog" />
      </form>

      {displayState.error && <p style={{ color: 'red' }}>{displayState.error}</p>}
      {displayState.success && (
        <p style={{ color: 'green' }}>Blog created successfully!</p>
      )}
    </div>
  );
}

