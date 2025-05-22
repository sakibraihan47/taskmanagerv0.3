import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start"
      style={{
        background: '#f9f9fb',
      }}
    >
      {/* Register form container */}
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
            Register your BlogSpace Account
          </h1>
          <div className="mb-8">
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-lg"
              style={{ color: '#7952ae' }}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 border rounded text-gray-800"
              style={{ background: '#fff', fontSize: '1rem' }}
              autoComplete="name"
            />
          </div>
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
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 rounded font-semibold"
            style={{
              background: '#22c55e', // Tailwind green-600
              color: '#fff',
              fontSize: '1.2rem',
              marginTop: '2rem',
              transition: 'background 0.2s',
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;