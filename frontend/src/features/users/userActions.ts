import { createUser, updateUser } from '@service/users';
import type { User } from '../../types';


export interface ActionState {
  error: string | null;
  success: boolean;
  user?: User;
}

export const createUserAction = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const username = formData.get('username') as string;
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;

  if (!username || !name || !password) {
    return { error: 'All fields are required', success: false };
  }

  try {
    const user = await createUser({ username, name, password });
    return { error: null, success: true, user };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Failed to create user',
      success: false,
    };
  }
};

export const updateUserAction = (username: string) =>
  async (
    _prevState: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    const name = formData.get('name') as string;

    if (!name) {
      return { error: 'Name is required', success: false };
    }

    try {
      const user = await updateUser(username, { name });
      return { error: null, success: true, user };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : 'Failed to update user',
        success: false,
      };
    }
  };

