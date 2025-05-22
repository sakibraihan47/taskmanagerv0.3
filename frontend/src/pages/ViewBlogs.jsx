import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const ViewBlogs = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/api/blogs/space', {
        
        });
        setBlogs(response.data);
      } catch (error) {
        alert('Failed to fetch Blogs.');
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: '#ece3fc', paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      <div
        className="w-full max-w-3xl mx-auto p-8 rounded mb-10"
        style={{
          background: 'linear-gradient(90deg, #a259d9 0%, #7952ae 100%)',
          boxShadow: '0 8px 32px 0 rgba(123, 97, 255, 0.18)',
        }}
      >
        <p className="text-2xl font-extrabold text-white text-center">
          BlogSpace - Your Personal BlogSpace
        </p>
      </div>
      <div className="w-full max-w-3xl mx-auto">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id || blog.id}
              className="bg-white p-6 mb-6 rounded shadow"
              style={{
                borderLeft: '5px solid #a259d9',
              }}
            >
              <h2
                className="font-bold text-2xl mb-2"
                style={{ color: '#7952ae' }}
              >
                {blog.title}
              </h2>
              <p className="mb-3 text-gray-800">{blog.description}</p>
              <p className="mb-3 text-gray-800">Author:  {blog.userId?.name || blog.userId?.email || 'Unknown'}</p>

              <p className="text-sm" style={{ color: '#a259d9' }}>
                Date: {new Date(blog.date).toLocaleDateString()}
              </p>
              {/* 
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setEditingBlog(blog)}
                  className="bg-[#7952ae] text-white px-4 py-2 rounded hover:bg-[#a259d9] transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
              */}
            </div>
          ))
        ) : (
          <div className="bg-gray-200 p-20 rounded shadow text-center">
            <p className="text-gray-500">No blogs available. Start adding some!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBlogs;