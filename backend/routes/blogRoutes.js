const express = require('express');
const { getAllBlogs, addBlog, updateBlog, deleteBlog, getBlogs } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// GET /api/blogs  -- get all blogs from all users (protected)
router.route('/')
  .get(getAllBlogs)  // Use getAllBlogs for all blogs

  .post(protect, addBlog);    // Add a new blog

// PUT /api/blogs/:id  -- update a blog
// DELETE /api/blogs/:id  -- delete a blog
router.route('/:id')
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;