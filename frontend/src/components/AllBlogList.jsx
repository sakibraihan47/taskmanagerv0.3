import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const AllBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/api/blogs', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load blogs');
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchBlogs();
    } else {
      setError('You must be logged in to view blogs.');
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div className="text-center mt-8">Loading blogs...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: '#ece3fc', paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      <div className="w-full max-w-3xl mx-auto bg-transparent p-8 rounded">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#7952ae' }}>
          All Blogs
        </h2>
        {blogs.length === 0 ? (
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

export default AllBlogList;