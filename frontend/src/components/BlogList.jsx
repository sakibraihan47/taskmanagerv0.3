import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const BlogList = ({ blogs, setBlogs, setEditingBlog }) => {
  const { user } = useAuth();

  const handleDelete = async (blogId) => {
    try {
      await axiosInstance.delete(`/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      alert('Failed to delete Blog.');
    }
  };

  return (
    <div>
      {blogs.length > 0 ?(
      
      blogs.map((blog) => (
        <div key={blog._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{blog.title}</h2>
          <p>{blog.description}</p>
          <p className="text-sm text-gray-500">Date: {new Date(blog.date).toLocaleDateString()}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingBlog(blog)}
              

               className="px-4 py-2 rounded text-white mr-2 transition"
  style={{ background: '#7952ae' }}
  onMouseOver={e => e.currentTarget.style.background = '#a259d9'}
  onMouseOut={e => e.currentTarget.style.background = '#7952ae'}

            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(blog._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    ):(
    <div className="bg-gray-200 p-20 rounded shadow text-center">
      <p className="text-gray-500">No blogs available. Start adding some!</p>
    </div>
    )
}
      
    </div>
  );
};

export default BlogList;
