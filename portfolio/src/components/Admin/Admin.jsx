import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Admin.css';
import { useReviews } from '../context/ReviewsContext';



const AdminDashboard = () => {
  const { addAchievement } = useReviews();
  const [achievers, setAchievers] = useState([]);
  // view can be 'upload' | 'manage'
  const [view, setView] = useState('manage');
  const [achievementForm, setAchievementForm] = useState({
    image: null,
    preview: ''
  });
  const [showAchievementForm, setShowAchievementForm] = useState(false);
  const [notification, setNotification] = useState('');

  // Load achievements on component mount
  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/achievers');
        setAchievers(res.data || []);
      } catch (err) {
        console.error('Failed to load achievements', err);
      }
    };
    fetchAchievers();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteAchiever = async (id) => {
    if (!window.confirm('Delete this achiever image?')) return;
    try {
      await axios.delete(`${"http://localhost:5000/api/achievers"}/${id}`);
      setAchievers((prev) => prev.filter((a) => a._id !== id));
      showNotification('Achievement deleted');
    } catch (e) {
      console.error('Delete failed', e);
      alert('Failed to delete');
    }
  };

  const handleReplaceImage = async (id, file) => {
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await axios.patch(`${"http://localhost:5000/api/achievers"}/${id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAchievers((prev) => prev.map((a) => (a._id === id ? res.data : a)));
      showNotification('Image updated');
    } catch (e) {
      console.error('Update failed', e);
      alert('Failed to update image');
    }
  };

  const handleDeleteAchievement = async (id) => {
    if (!id) {
      console.error('No achievement ID provided for deletion');
      setNotification('Error: No achievement ID provided');
      return false;
    }

    if (!window.confirm('Are you sure you want to delete this achievement? This action cannot be undone.')) {
      return false;
    }

    try {
      await axios.delete(`http://localhost:5000/api/achievers/${id}`);
      // Update local state
      setAchievers(prev => prev.filter(achiever => achiever._id !== id));
      setNotification('Achievement deleted successfully');
      return true;
    } catch (error) {
      console.error('Failed to delete achievement:', error);
      setNotification('Failed to delete achievement. Please try again.');
      return false;
    }
  };

  const handleAchievementChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setAchievementForm(prev => ({
        ...prev,
        image: file,
        preview: previewUrl
      }));
    } else {
      setAchievementForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAchievementSubmit = async (e) => {
    e.preventDefault();

    if (!achievementForm.image) {
      alert('Please select an image to upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', achievementForm.image);

      await axios.post('http://localhost:5000/api/achievers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: false
      });

      // Optional local UI add
      addAchievement({ id: Date.now(), image: achievementForm.preview });

      // Refresh achievers list
      try {
        const res = await axios.get('http://localhost:5000/api/achievers');
        setAchievers(res.data || []);
      } catch {}

      setAchievementForm({ image: null, preview: '' });
      setShowAchievementForm(false);
      showNotification('Achievement uploaded successfully');
    } catch (err) {
      console.error('Upload failed', err);
      alert('Failed to upload achievement');
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };


  return (
    <div className="admin-dashboard">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage Our Gallery</p>
      </header>

      <div className="admin-content">
        <div className="admin-sidebar">
          <h3>Quick Actions</h3>
          <button
            className={`sidebar-btn ${view === 'upload' ? 'active' : ''}`}
            onClick={() => {
              setShowAchievementForm(true);
              setView('upload');
              
            }}
            style={{ marginBottom: '8px' }}
          >
            Add Achievement
          </button>
          <button
            className={`sidebar-btn ${view === 'manage' ? 'active' : ''}`}
            onClick={() => {
              setShowAchievementForm(false);
              setView('manage');
            }}
          >
            Manage Achievements
          </button>

          
        </div>

        <div className="admin-main">
          {view === 'upload' ? (
            <div className="achievement-form-section">
              <h2>Add New Achievement</h2>
              <form onSubmit={handleAchievementSubmit} className="achievement-form">
                {/* Name and Score removed as per new requirement (image-only upload) */}

                <div className="form-group">
                  <label htmlFor="image">Achievement Photo</label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleAchievementChange}
                      required
                    />
                    {achievementForm.preview && (
                      <div className="image-preview">
                        <img src={achievementForm.preview} alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">Upload Achievement</button>
                </div>
              </form>
            </div>
          ) : view === 'reviews' ? (
            <>
              

              <div className="reviews-list">
                <div className="results-count">
                  Showing {filteredReviews.length} of {reviews.length} reviews
                </div>

                {filteredReviews.length === 0 ? (
                  <div className="no-results">
                    <p>No reviews match your filters</p>
                  </div>
                ) : (
                  filteredReviews.map((review, i) => (
                    <div key={review._id || review.id || `rev-${i}`} className="admin-review-card">
                      <div className="review-content">
                        <p>"{review.comment || review.text || 'No comment provided'}"</p>
                      </div>

                      <div className="review-meta">
                        <div className="rating">{renderStars(review.rating)}</div>
                        <div className="reviewer-info">
                          {review.avatar && (
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="avatar"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          <span className="reviewer-name">{review.name || 'Anonymous'}</span>
                        </div>
                        <div className="review-date">
                          ID: #{review._id || review.id || 'N/A'}
                        </div>
                      </div>

                      <div className="review-actions">
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteReview(review._id || review.id, e);
                          }}
                          disabled={!(review._id || review.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="achievers-admin">
              <h2>Manage Achievements</h2>
              {achievers.length === 0 ? (
                <div className="no-results"><p>No achievements uploaded yet</p></div>
              ) : (
                <div className="achievers-admin-grid">
                  {achievers.map((a) => (
                    <div className="achiever-admin-card" key={a._id}>
                      <img src={a.image} alt={a.name || 'achievement'} className="achiever-thumb" />
                      <div className="achiever-actions">
                        <label className="btn-secondary" style={{cursor:'pointer'}}>
                          Replace Image
                          <input type="file" accept="image/*" style={{display:'none'}} onChange={(e)=>handleReplaceImage(a._id, e.target.files?.[0])} />
                        </label>
                        <button className="btn-delete" onClick={()=>handleDeleteAchiever(a._id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;