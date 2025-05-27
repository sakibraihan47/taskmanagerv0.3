# TaskManager v0.3

A full-stack blog web application that allows users to create, read, update, and delete blog posts. It provides a user-friendly interface for bloggers to share their thoughts and manage their content.

## Features

* User Authentication (Signup, Login, Logout)
* Profile Management
* Blog Management:
  * Create new blogs
  * View all blogs
  * Update existing blogs
  * Delete blogs

## API Documentation

### Authentication

User authentication is handled via POST requests:

![Login Request via POST](readme_img/login-req-via-post.png "Login API Request Example")

### Blog Operations

#### Retrieving Blogs

Get all blogs:

![Retrieve All Blogs](readme_img/get-req-retrieve-all-blogs.png "GET Request to Retrieve All Blogs")

Get user-specific blogs:

![User Blogs](readme_img/get-user-blogs.png "GET Request for User Blogs")

#### Creating and Updating Blogs

Post functionality:

![Post Functionality](readme_img/post-functionality.png "POST Request Example")

Update functionality:

![Update Function](readme_img/test-case-put-function.png "PUT Request Example")

## API Summary

![API Authentication Summary](readme_img/summary-api-auth-req.png "API Authentication Summary")
