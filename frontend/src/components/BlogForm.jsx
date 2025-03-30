import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const BlogForm = ({ blogs, setBlogs, editingBlog, setEditingBlog }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', date: '' });

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        description: editingBlog.description,
        date: editingBlog.date,
      });
    } else {
      setFormData({ title: '', description: '', date: '' });
    }
  }, [editingBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        const response = await axiosInstance.put(`/api/blogs/${editingBlog._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBlogs(blogs.map((blog) => (blog._id === response.data._id ? response.data : blog)));
      } else {
        const response = await axiosInstance.post('/api/blogs', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBlogs([...blogs, response.data]);
      }
      setEditingBlog(null);
      setFormData({ title: '', description: '', date: '' });
    } catch (error) {
      alert('Failed to save blog.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingBlog ? 'Edit Blog' : 'Add Blog'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingBlog ? 'Update Blog' : 'Add Blog'}
      </button>
    </form>
  );
};

export default BlogForm;
