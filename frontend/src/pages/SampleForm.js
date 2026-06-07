import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './SampleForm.css';

function SampleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    sampleId: '',
    name: '',
    description: '',
    category: 'Material',
    status: 'Active',
    quantity: 0,
    location: '',
    supplier: '',
    batchNumber: '',
    notes: '',
  });

  useEffect(() => {
    if (id) {
      fetchSample();
    }
  }, [id]);

  const fetchSample = async () => {
    try {
      const response = await axios.get(`/api/samples/${id}`);
      setFormData(response.data);
    } catch (err) {
      setError('Error loading sample');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (id) {
        await axios.put(`/api/samples/${id}`, formData);
        navigate(`/samples/${id}`);
      } else {
        await axios.post('/api/samples', formData);
        navigate('/samples');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error saving sample');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="sample-form">
      <div className="page-header">
        <h2>{id ? 'Edit Sample' : 'Add New Sample'}</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <label>Sample ID *</label>
            <input
              type="text"
              name="sampleId"
              value={formData.sampleId}
              onChange={handleChange}
              required
              disabled={!!id}
            />
          </div>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option>Material</option>
              <option>Product</option>
              <option>Chemical</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>In Review</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Supplier</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Batch Number</label>
            <input
              type="text"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="button-primary" disabled={loading}>
            {loading ? 'Saving...' : (id ? 'Update Sample' : 'Create Sample')}
          </button>
          <button type="button" className="button-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SampleForm;