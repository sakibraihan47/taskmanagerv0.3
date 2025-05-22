const Blog = require('../models/Blog');

// Get blogs for the current authenticated user
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.user.id });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs, with user info (public, for /space or /all)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('userId', 'username email');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
};

// Optionally, alias getBlogSpace to getAllBlogs if you want both endpoints to behave the same
const getBlogSpace = getAllBlogs;

// Add a new blog (authenticated)
const addBlog = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const blog = await Blog.create({ userId: req.user.id, title, description, date });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog (authenticated)
const updateBlog = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.date = date || blog.date;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog (authenticated)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    await blog.remove();
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBlogs,
  getAllBlogs,
  getBlogSpace,
  addBlog,
  updateBlog,
  deleteBlog
};