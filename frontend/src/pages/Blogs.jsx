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
        background: '#ece3fc',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}
    >
      <div className="w-full max-w-5xl px-4 sm:px-8">
        {/* Flex row for desktop, column for mobile */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Blog List LEFT */}
          <div className="md:w-2/3 w-full">
            <BlogList blogs={blogs} setBlogs={setBlogs} setEditingBlog={setEditingBlog} />
          </div>
          {/* Blog Form RIGHT */}
          <div className="md:w-1/3 w-full">
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              editingBlog={editingBlog}
              setEditingBlog={setEditingBlog}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;