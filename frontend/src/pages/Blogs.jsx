import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';
import { useAuth } from '../context/AuthContext';

const Blogs = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/api/blogs', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBlogs(response.data);
      } catch (error) {
        alert('Failed to fetch Blogs.');
      }
    };

    fetchBlogs();
  }, [user]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        background: '#ece3fc', // matches the theme background
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}
    >
      <div className="w-full max-w-4xl">
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          editingBlog={editingBlog}
          setEditingBlog={setEditingBlog}
        />
        <BlogList blogs={blogs} setBlogs={setBlogs} setEditingBlog={setEditingBlog} />
        {/* <BlogView blogs={blogs} /> */}
      </div>
    </div>
  );
};

export default Blogs;