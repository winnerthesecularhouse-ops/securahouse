import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Admin.css';
import { useReviews } from '../context/ReviewsContext';

const API_URL = 'http://localhost:5000/api/achievers';

const AdminDashboard = () => {
  const { reviews, deleteReview, addAchievement } = useReviews();
  const [achievers, setAchievers] = useState([]);
  // view can be 'reviews' | 'upload' | 'manage'
  const [view, setView] = useState('reviews');
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [filters, setFilters] = useState({
    rating: 'all',
    search: '',
    sort: 'newest'
  });
  const [achievementForm, setAchievementForm] = useState({
    image: null,
    preview: ''
  });
  const [showAchievementForm, setShowAchievementForm] = useState(false);
  const [notification, setNotification] = useState('');

  // Apply filters whenever reviews or filters change
  useEffect(() => {
    let result = [...reviews];

    if (filters.rating !== 'all') {
      result = result.filter(review => review.rating === parseInt(filters.rating));
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(review =>
        review.name.toLowerCase().includes(searchTerm) ||
        review.text.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.sort === 'newest') {
      result.sort((a, b) => b.id - a.id);
    } else if (filters.sort === 'oldest') {
      result.sort((a, b) => a.id - b.id);
    } else if (filters.sort === 'highest') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === 'lowest') {
      result.sort((a, b) => a.rating - b.rating);
    }

    setFilteredReviews(result);
  }, [reviews, filters]);

  // Load achievers list for admin management
  useEffect(() => {
    const loadAchievers = async () => {
      try {
        const res = await axios.get(API_URL);
        setAchievers(res.data || []);
      } catch (e) {
        console.error('Failed to load achievers for admin', e);
      }
    };
    loadAchievers();
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
      await axios.delete(`${API_URL}/${id}`);
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
      const res = await axios.patch(`${API_URL}/${id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAchievers((prev) => prev.map((a) => (a._id === id ? res.data : a)));
      showNotification('Image updated');
    } catch (e) {
      console.error('Update failed', e);
      alert('Failed to update image');
    }
  };

  const handleDeleteReview = async (id, event) => {
    // Prevent any default behavior and stop event propagation
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent?.stopImmediatePropagation?.();
    }
    
    if (!id) {
      console.error('No review ID provided for deletion');
      setNotification({
        type: 'error',
        message: 'Error: No review ID provided',
      });
      return false;
    }

    if (!window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return false;
    }

    try {
      setNotification({
        type: 'info',
        message: 'Deleting review...',
        loading: true
      });

      // Make the delete request
      const result = await deleteReview(id);
      
      if (result && result.success) {
        // Update local state
        setFilteredReviews(prevReviews => 
          prevReviews.filter(review => review._id !== id && review.id !== id)
        );
      
        setNotification({
          type: 'success',
          message: 'Review deleted successfully',
          loading: false
        });
      
        // Optional: Refresh the list from server (aap chahe to ye hata bhi sakte ho)
        try {
          const response = await axios.get('http://localhost:5000/api/reviews/admin', { 
            withCredentials: true 
          });
          setFilteredReviews(response.data);
        } catch (refreshError) {
          console.error('Error refreshing reviews:', refreshError);
        }
      
        // 🔴 Add this line for hard refresh
        window.location.reload();
      
        return true;
      }
       else {
        throw new Error(result?.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
      
      // Refresh reviews from server to sync state
      try {
        const response = await axios.get('http://localhost:5000/api/reviews/admin', { 
          withCredentials: true 
        });
        setFilteredReviews(response.data);
      } catch (refreshError) {
        console.error('Error refreshing reviews:', refreshError);
      }
      
      setNotification({
        type: 'error',
        message: error.message || 'Failed to delete review. Please try again.',
        loading: false
      });
      
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

      await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: false
      });

      // Optional local UI add
      addAchievement({ id: Date.now(), image: achievementForm.preview });

      // Refresh achievers list
      try {
        const res = await axios.get(API_URL);
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

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
    ));
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
        <p>Manage reviews and achievements</p>
      </header>

      <div className="admin-content">
        <div className="admin-sidebar">
          <h3>Quick Actions</h3>
          <button
            className={`sidebar-btn ${view === 'reviews' ? 'active' : ''}`}
            onClick={() => {
              setView('reviews');
            }}
            style={{ marginBottom: '8px' }}
          >
            View Reviews
          </button>
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

          <div className="stats">
            <h3>Statistics</h3>
            <div className="stat-item">
              <span className="stat-value">{reviews.length}</span>
              <span className="stat-label">Total Reviews</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {reviews.filter(r => r.rating === 5).length}
              </span>
              <span className="stat-label">5-Star Reviews</span>
            </div>
          </div>
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
              <div className="filters-section">
                <h2>Manage Reviews</h2>

                <div className="filters">
                  <div className="filter-group">
                    <label htmlFor="rating">Filter by Rating</label>
                    <select
                      id="rating"
                      name="rating"
                      value={filters.rating}
                      onChange={handleFilterChange}
                    >
                      <option value="all">All Ratings</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label htmlFor="sort">Sort By</label>
                    <select
                      id="sort"
                      name="sort"
                      value={filters.sort}
                      onChange={handleFilterChange}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest">Highest Rated</option>
                      <option value="lowest">Lowest Rated</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label htmlFor="search">Search</label>
                    <input
                      type="text"
                      id="search"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      placeholder="Search by name or content"
                    />
                  </div>
                </div>
              </div>

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