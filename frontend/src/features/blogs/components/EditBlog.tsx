import { useNavigate } from 'react-router-dom';


import useSWR, { useSWRConfig } from 'swr';
import { getBlog, updateBlog } from '@service/blogs';

interface Props {
  id: number | string;
}

export default function EditBlog({ id }: Props) {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();

  const blogId = Number(id);
  if (isNaN(blogId)) {
    throw new Error('Invalid blog ID');
  }

  const { data: blog, } = useSWR(`/api/blogs/${blogId}`, 
    () => getBlog(blogId), {suspense: true});

  // if (isLoading) return <p>Loading blog...</p>;
  // if (error) return <p style={{ color: 'red' }}>{String(error)}</p>;
  if (!blog) return <p>Blog not found</p>;

  const incrementLikes = async () => {
    const nextLikes = (blog.likes ?? 0) + 1;

    try {
      await updateBlog(blogId, { likes: nextLikes });
      mutate(`/api/blogs/${blogId}`); // Refresh the blog data
      navigate('/blogs');
    } catch (err) {
      console.error('Failed to update blog:', err);
      alert('Failed to update blog. Please try again.');
    }
  };

  return (
    <button
      onClick={incrementLikes}
      style={{ backgroundColor: 'blue', color: 'white' }}
    >
      {blog.likes ?? 0} Likes
    </button>
  );
}


