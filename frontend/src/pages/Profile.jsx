import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          university: response.data.university || '',
          address: response.data.address || '',
        });
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#ece3fc' }}>
        <div className="text-2xl text-[#7952ae] font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: '#ece3fc',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      {/* Header Bar */}
      <div
        className="w-full max-w-3xl mx-auto p-8 rounded mb-10"
        style={{
          background: 'linear-gradient(90deg, #a259d9 0%, #7952ae 100%)',
          boxShadow: '0 8px 32px 0 rgba(123, 97, 255, 0.18)',
        }}
      >
        <p className="text-2xl font-extrabold text-white text-center">
          BlogSpace - Your Profile Information
        </p>
      </div>
      {/* Profile Form */}
      <div className="w-full max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded shadow-lg p-10"
          style={{
            borderLeft: '6px solid #a259d9',
            boxShadow: '0 4px 24px 0 rgba(123, 97, 255, 0.10)',
          }}
        >
          <h1 className="text-3xl font-bold mb-10 text-center" style={{ color: '#7952ae' }}>
            Your Profile
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
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#a259d9] transition"
              style={{ background: '#f9f9fb', fontSize: '1rem' }}
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
              className="w-full p-4 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#a259d9] transition"
              style={{ background: '#f9f9fb', fontSize: '1rem' }}
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="university"
              className="block mb-2 font-semibold text-lg"
              style={{ color: '#7952ae' }}
            >
              University
            </label>
            <input
              id="university"
              type="text"
              placeholder="University"
              value={formData.university}
              onChange={(e) =>
                setFormData({ ...formData, university: e.target.value })
              }
              className="w-full p-4 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#a259d9] transition"
              style={{ background: '#f9f9fb', fontSize: '1rem' }}
            />
          </div>
          <div className="mb-12">
            <label
              htmlFor="address"
              className="block mb-2 font-semibold text-lg"
              style={{ color: '#7952ae' }}
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-4 border rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#a259d9] transition"
              style={{ background: '#f9f9fb', fontSize: '1rem' }}
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 rounded font-semibold shadow"
            style={{
              background: 'linear-gradient(90deg, #a259d9 0%, #7952ae 100%)',
              color: '#fff',
              fontSize: '1.2rem',
              marginTop: '2rem',
              transition: 'background 0.2s',
              letterSpacing: '1px',
              boxShadow: '0 4px 16px 0 rgba(123, 97, 255, 0.08)',
            }}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;