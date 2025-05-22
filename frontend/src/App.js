import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Blogs from './pages/Blogs';
import Home from './pages/Home';
import ViewBlogs from './pages/ViewBlogs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/viewblogs" element={<ViewBlogs/>} />
      </Routes>
    </Router>
  );
}

export default App;
