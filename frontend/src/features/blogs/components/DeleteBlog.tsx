import { useSWRConfig } from 'swr';
import { deleteBlog } from '../../../service/blogs';
import { useNavigate } from 'react-router-dom';

interface DeleteBlogProps {
  id: number | string;
}

export default function DeleteBlog({ id }: DeleteBlogProps) {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

      await deleteBlog(id);
      alert('Blog deleted successfully');
      mutate('/api/blogs'); // Refresh the list of blogs
      setTimeout(() => {
        navigate('/blogs');
      }, 500);

  };

  return (
    <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
      Delete Blog
    </button>
  );
}
