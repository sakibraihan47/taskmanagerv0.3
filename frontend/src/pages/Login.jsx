import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/blogs');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start"
      style={{
        background: '#f9f9fb',
      }}
    >
      {/* Login form container */}
      <div
        className="w-full flex flex-col items-center"
        style={{
          minHeight: '100vh',
          background: '#ece3fc',
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto bg-transparent p-8 mt-16 rounded"
        >
          <h1
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: '#7952ae' }}
          >
            Login
          </h1>
          <div className="mb-8">
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-lg"
              style={{ color: '#7952ae' }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 border rounded text-gray-800"
              style={{ background: '#fff', fontSize: '1rem' }}
              autoComplete="username"
            />
          </div>
          <div className="mb-12">
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-lg"
              style={{ color: '#7952ae' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-4 border rounded text-gray-800"
              style={{ background: '#fff', fontSize: '1rem' }}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 rounded font-semibold"
            style={{
              background: '#7952ae',
              color: '#fff',
              fontSize: '1.2rem',
              marginTop: '2rem',
              transition: 'background 0.2s',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;