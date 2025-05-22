const express = require('express');
const { getBlogs, getAllBlogs, addBlog, updateBlog, deleteBlog, getBlogSpace } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Public route for all blogs (for AllBlogs.jsx)
router.get('/space', getBlogSpace);

// Authenticated user routes
router.route('/').get(protect, getBlogs).post(protect, addBlog);
router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog);

module.exports = router;