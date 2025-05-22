import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const { user } = useAuth(); // Access user token from context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch profile data from the backend
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
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start"
      style={{
        background: '#f9f9fb',
      }}
    >
      {/* Header Bar */}
      <div
        className="w-full shadow"
        style={{
          background: '#a259d9',
          borderTop: '5px solid #60a5fa',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-8 py-6">
          <span
            className="text-white font-extrabold"
            style={{
              fontSize: '4rem',
              letterSpacing: '2px',
            }}
          >
            BlogSpace - Your Space
          </span>
        </div>
      </div>
      {/* Profile form container */}
      <div
        className="w-full flex flex-col items-center"
        style={{
          minHeight: 'calc(100vh - 128px)',
          background: '#ece3fc',
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto bg-transparent p-8 mt-12 rounded"
        >
          <h1
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: '#7952ae' }}
          >
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
              className="w-full p-4 border rounded text-gray-800"
              style={{ background: '#fff', fontSize: '1rem' }}
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
              className="w-full p-4 border rounded text-gray-800"
              style={{ background: '#fff', fontSize: '1rem' }}
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
              className="w-full p-4 border rounded text-gray-800"
              style={{ background: '#fff', fontSize: '1rem' }}
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