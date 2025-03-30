
const express = require('express');
const { getBlogs, addBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getBlogs).post(protect, addBlog);
router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog);

module.exports = router;
