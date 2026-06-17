import type { Blog, CreateBlogInput, UpdateBlogInput } from '../../types';
import { createBlog, deleteBlog, updateBlog } from '@service/blogs';



export interface ActionState {
  error: string | null;
  success: boolean;
  blog?: Blog;
}

function getString(formData: FormData, key: string): string {
  return (formData.get(key) ?? '') as string;
}

export const createBlogAction = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const title = getString(formData, 'title');
  const author = getString(formData, 'author');
  const url = getString(formData, 'url');
  const yearRaw = getString(formData, 'year');

  const year = yearRaw ? Number(yearRaw) : undefined;

  const input: CreateBlogInput = {
    title,
    author,
    url,
    year,
  };

  if (!input.title || !input.author || !input.url) {
    return { error: 'Title, author and URL are required', success: false };
  }

  try {
    const blog = await createBlog(input);
    return { error: null, success: true, blog };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Failed to create blog',
      success: false,
    };
  }
};

export const updateBlogLikesAction =
  (id: number) =>
  async (_prevState: ActionState, formData: FormData): Promise<ActionState> => {
    const likesRaw = getString(formData, 'likes');
    const likes = Number(likesRaw);

    if (!Number.isFinite(likes)) {
      return { error: 'Likes must be a number', success: false };
    }

    const input: UpdateBlogInput = { likes };

    try {
      const blog = await updateBlog(id, input);
      return { error: null, success: true, blog };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : 'Failed to update blog',
        success: false,
      };
    }
  };

  export const deleteBlogAction =
  (id: number) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_prevState: ActionState): Promise<ActionState> => {
    try {
      await deleteBlog(id);
      return { error: null, success: true };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : 'Failed to delete blog',
        success: false,
      };
    }
  }; 

