import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/api/space');
        // Log the response for debugging
        console.log('API response:', response.data);
        // Handle both array and object response
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        } else if (Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error('Failed to load blogs:', err.response || err.message || err);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: '#ece3fc', paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      <div className="w-full max-w-3xl mx-auto bg-transparent p-8 rounded">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#7952ae' }}>
          All Blogs
        </h2>
        {loading ? (
          <div className="text-center mt-8">Loading blogs...</div>
        ) : error ? (
          <div className="text-center mt-8 text-red-500">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="bg-gray-200 p-8 rounded shadow text-center">
            <p className="text-gray-500">No blogs found.</p>
          </div>
        ) : (
          <ul className="space-y-8">
            {blogs.map((blog) => (
              <li key={blog._id} className="bg-white rounded shadow p-6">
                <h3 className="text-2xl font-semibold mb-2" style={{ color: '#a259d9' }}>
                  {blog.title}
                </h3>
                <p className="mb-4 text-gray-800">{blog.description}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
                  <span>
                    <span className="font-semibold" style={{ color: '#7952ae' }}>Author:</span>{' '}
                    {blog.userId?.username || blog.userId?.email || "Unknown"}
                  </span>
                  <span>
                    <span className="font-semibold" style={{ color: '#7952ae' }}>Date:</span>{' '}
                    {new Date(blog.date || blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;