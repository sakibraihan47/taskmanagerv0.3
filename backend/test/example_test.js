const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const app = require('../server'); 
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const sinon = require('sinon');
const Blog = require('../models/Blog');
const { updateBlog,getBlogs,addBlog,deleteBlog } = require('../controllers/blogController');
const { expect } = chai;

chai.use(chaiHttp);
let server;
let port;


describe('AddBlog Function Test', () => {

  it('should create a new blog successfully', async () => {
    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { title: "New Blog", description: "Blog description", date: "2025-12-31" }
    };

    // Mock task that would be created
    const createdBlog = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };

    // Stub Task.create to return the createdTask
    const createStub = sinon.stub(Blog, 'create').resolves(createdBlog);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addBlog(req, res);

    // Assertions
    expect(createStub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdBlog)).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub Task.create to throw an error
    const createStub = sinon.stub(Blog, 'create').throws(new Error('DB Error'));

    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { title: "New Blog", description: "Blog description", date: "2025-12-31" }
    };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addBlog(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

});

/**** 
describe('UpdateBlog Function Test', () => {

  it('should update Blog successfully', async () => {
    // Mock task data
    const blogId = new mongoose.Types.ObjectId();
    const existingBlog = {
      _id: blogId,
      title: "Old Blog",
      description: "Old Description",
      completed: false,
      date: new Date(),
      save: sinon.stub().resolvesThis(), // Mock save method
    };
    // Stub Task.findById to return mock task
    const findByIdStub = sinon.stub(Blog, 'findById').resolves(existingBlog);

    // Mock request & response
    const req = {
      params: { id: blogId },
      body: { title: "New Blog", completed: true }
    };
    const res = {
      json: sinon.spy(), 
      status: sinon.stub().returnsThis()
    };

    // Call function
    await updateBlog(req, res);

    // Assertions
    expect(existingBlog.title).to.equal("New Blog");
    expect(existingBlog.completed).to.equal(true);
    expect(res.status.called).to.be.false; // No error status should be set
    expect(res.json.calledOnce).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });



  it('should return 404 if blog is not found', async () => {
    const findByIdStub = sinon.stub(Blog, 'findById').resolves(null);

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateBlog(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Blog not found' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 500 on error', async () => {
    const findByIdStub = sinon.stub(Blog, 'findById').throws(new Error('DB Error'));

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateBlog(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;

    findByIdStub.restore();
  });



});

**/

describe('UpdateBlog Function Test', () => {
  afterEach(() => {
    // Restore all stubs after each test to ensure clean state
    sinon.restore();
  });

  it('should update Blog successfully', async () => {
    // Mock blog data
    const blogId = new mongoose.Types.ObjectId();
    const existingBlog = {
      _id: blogId,
      title: 'Old Blog',
      description: 'Old Description',
      completed: false,
      date: new Date(),
      save: sinon.stub().resolvesThis(), // Mock save method
    };

    // Stub Blog.findById to return the mock blog
    sinon.stub(Blog, 'findById').resolves(existingBlog);

    // Mock request and response objects
    const req = {
      params: { id: blogId.toString() },
      body: { title: 'New Blog', completed: true },
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };

    // Call the function
    await updateBlog(req, res);

    // Assertions
    expect(existingBlog.title).to.equal('New Blog');
    expect(existingBlog.completed).to.equal(true);
    expect(res.status.called).to.be.false; // No errors, so status should not be called
    expect(res.json.calledOnce).to.be.true;

    // Assert that response contains the updated blog
    expect(res.json.calledWith(sinon.match({ title: 'New Blog', completed: true }))).to.be.true;
  });

  it('should return 404 if blog is not found', async () => {
    // Stub Blog.findById to return null
    sinon.stub(Blog, 'findById').resolves(null);

    // Mock request and response objects
    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the function
    await updateBlog(req, res);

    // Assertions
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Blog not found' })).to.be.true;
  });

  it('should return 500 on database error', async () => {
    // Stub Blog.findById to throw an error
    sinon.stub(Blog, 'findById').throws(new Error('Database Error'));

    // Mock request and response objects
    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the function
    await updateBlog(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith(sinon.match.has('message'))).to.be.true;
  });
});

describe('GetBlog Function Test', () => {

  it('should return blogs for the given user', async () => {
    // Mock user ID
    const userId = new mongoose.Types.ObjectId();

    // Mock task data
    const blogs = [
      { _id: new mongoose.Types.ObjectId(), title: "Blog 1", userId },
      { _id: new mongoose.Types.ObjectId(), title: "Blog 2", userId }
    ];

    // Stub Task.find to return mock tasks
    const findStub = sinon.stub(Blog, 'find').resolves(blogs);

    // Mock request & response
    const req = { user: { id: userId } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    // Call function
    await getBlogs(req, res);

    // Assertions
    expect(findStub.calledOnceWith({ userId })).to.be.true;
    expect(res.json.calledWith(blogs)).to.be.true;
    expect(res.status.called).to.be.false; // No error status should be set

    // Restore stubbed methods
    findStub.restore();
  });

  it('should return 500 on error', async () => {
    // Stub Task.find to throw an error
    const findStub = sinon.stub(Blog, 'find').throws(new Error('DB Error'));

    // Mock request & response
    const req = { user: { id: new mongoose.Types.ObjectId() } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    // Call function
    await getBlogs(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    findStub.restore();
  });

});



describe('DeleteBlog Function Test', () => {

  it('should delete a blog successfully', async () => {
    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock task found in the database
    const blog = { remove: sinon.stub().resolves() };

    // Stub Task.findById to return the mock task
    const findByIdStub = sinon.stub(Blog, 'findById').resolves(blog);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteBlog(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(blog.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Blog deleted' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 404 if blog is not found', async () => {
    // Stub Task.findById to return null
    const findByIdStub = sinon.stub(Blog, 'findById').resolves(null);

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteBlog(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Blog not found' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub Task.findById to throw an error
    const findByIdStub = sinon.stub(Blog, 'findById').throws(new Error('DB Error'));

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteBlog(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

});