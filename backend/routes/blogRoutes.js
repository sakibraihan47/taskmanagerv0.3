const express = require('express');
const { getBlogs, getAllBlogs, addBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Get blogs for current user (protected)
router.route('/').get(protect, getBlogs).post(protect, addBlog);

// Get all blogs (public)
router.route('/space').get(getAllBlogs);

// Update and delete a blog (protected)
router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog);

module.exports = router;