const Blog = require('../models/Blog');


//getBlog

const getBlogs = async (
req,
res) => {
try {
const blogs = await Blog.find({ userId: req.user.id });
res.json(blogs);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

//getallBlogs
/*
const getAllBlogs = async (
    req,
    res) => {
    try {
    const blogs = await Blog.find();
    res.json(blogs);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };
*/


const getAllBlogs = async (req, res) => {
  try {
    // Find all blogs and populate user info
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
};






    
// addBlog




const addBlog = async (
    req,
    res) => {
    const { title, description, date } = req.body;
    try {
    const blog = await Blog.create({ userId: req.user.id, title, description, date });
    res.status(201).json(blog);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };

//updateBlog
    const updateBlog = async (
        req,
        res) => {
        const { title, description, date } = req.body;
        try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        blog.title = title || blog.title;
        blog.description = description || blog.description;
        //blog.completed = completed ?? task.completed;
        blog.date = date || blog.date;
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
        };

    //deleteBlog

    const deleteBlog = async (
        req,
        res) => {
            try {
                const blog = await Blog.findById(req.params.id);
                if (!blog) return res.status(404).json({ message: 'Blog not found' });
                await blog.remove();
                res.json({ message: 'Blog deleted' });
                } catch (error) {
                res.status(500).json({ message: error.message });
                }
                };
                module.exports = { getBlogs,getAllBlogs, addBlog, updateBlog, deleteBlog };