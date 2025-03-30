
const express = require('express');
const { getBlogs, getAllBlogs, addBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getBlogs).get(getAllBlogs).post(protect, addBlog);
router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog);

module.exports = router;
