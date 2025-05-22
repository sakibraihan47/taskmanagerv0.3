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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 shadow-lg rounded mb-8"
      style={{
        borderLeft: '6px solid #a259d9',
        boxShadow: '0 4px 24px 0 rgba(123, 97, 255, 0.10)',
        maxWidth: 600,
        margin: '0 auto'
      }}
    >
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#7952ae' }}>
        {editingBlog ? 'Edit Blog' : 'Add new Blog to BlogSpace'}
      </h1>
      <input
        type="text"
        placeholder="Blog Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-5 p-3 border rounded font-semibold focus:outline-none focus:ring-2"
        style={{
          background: '#f9f9fb',
          borderColor: '#a259d9',
          color: '#7952ae',
          fontSize: '1.1rem',
          boxShadow: '0 2px 8px 0 rgba(123, 97, 255, 0.06)'
        }}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-5 p-3 border rounded font-semibold focus:outline-none focus:ring-2"
        rows={8}
        style={{
          resize: 'vertical',
          minHeight: '140px',
          background: '#f9f9fb',
          borderColor: '#a259d9',
          color: '#7952ae',
          fontSize: '1.08rem',
          boxShadow: '0 2px 8px 0 rgba(123, 97, 255, 0.06)'
        }}
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full mb-6 p-3 border rounded font-semibold focus:outline-none focus:ring-2"
        style={{
          background: '#f9f9fb',
          borderColor: '#a259d9',
          color: '#7952ae',
          fontSize: '1.05rem',
          boxShadow: '0 2px 8px 0 rgba(123, 97, 255, 0.06)'
        }}
      />
      <button
        type="submit"
        className="w-full p-4 rounded font-semibold shadow"
        style={{
          background: 'linear-gradient(90deg, #a259d9 0%, #7952ae 100%)',
          color: '#fff',
          fontSize: '1.15rem',
          transition: 'background 0.2s',
          letterSpacing: '1px',
          boxShadow: '0 4px 16px 0 rgba(123, 97, 255, 0.08)',
        }}
      >
        {editingBlog ? 'Update Blog' : 'Add Blog'}
      </button>
    </form>
  );
};

export default BlogForm;