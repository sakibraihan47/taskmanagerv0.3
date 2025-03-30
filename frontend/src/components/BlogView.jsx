import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useState, useEffect } from 'react';

const BlogView = (blogs) => {
   // const { user } = useAuth();
     const [BlogView, setBlogs] = useState([]);
    // const [editingBlog, setEditingBlog] = useState(null);
   
    
     useEffect(() => {
       const fetchBlogs = async () => {
         try {
           const response = await axiosInstance.get('/api/blogs');
      
           setBlogs(response.data);
         } catch (error) {
           alert('Failed to fetch Blogs.');
         }
       };
   
       fetchBlogs();
     }, []);
   
  return (
    <div>
      {blogs.length > 0 ?(
      
      blogs.map((blog) => (
        <div key={blog} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{blog.title}</h2>
          <p>{blog.description}</p>
          <p className="text-sm text-gray-500">Date: {new Date(blog.date).toLocaleDateString()}</p>
        {/*
        <div className="mt-2">
           // <button
              onClick={() => setEditingBlog(blog)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
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
         */ }
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

export default BlogView;
