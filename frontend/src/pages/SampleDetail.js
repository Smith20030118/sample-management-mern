import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SampleDetail.css';

function SampleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sample, setSample] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSample();
  }, [id]);

  const fetchSample = async () => {
    try {
      const response = await axios.get(`/api/samples/${id}`);
      setSample(response.data);
    } catch (err) {
      setError('Error loading sample');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this sample?')) {
      try {
        await axios.delete(`/api/samples/${id}`);
        navigate('/samples');
      } catch (err) {
        setError('Error deleting sample');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!sample) return <div>Sample not found</div>;

  return (
    <div className="sample-detail">
      <div className="detail-header">
        <h2>{sample.name}</h2>
        <div className="header-actions">
          <Link to={`/samples/${id}/edit`} className="button-primary">Edit</Link>
          <button onClick={handleDelete} className="button-danger">Delete</button>
          <button onClick={() => navigate(-1)} className="button-secondary">Back</button>
        </div>
      </div>

      <div className="detail-container">
        <div className="detail-card">
          <h3>Basic Information</h3>
          <div className="detail-row">
            <div className="detail-item">
              <span className="label">Sample ID</span>
              <span className="value">{sample.sampleId}</span>
            </div>
            <div className="detail-item">
              <span className="label">Category</span>
              <span className="value">{sample.category}</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="label">Status</span>
              <span className={`status-badge status-${sample.status.toLowerCase()}`}>
                {sample.status}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Quantity</span>
              <span className="value">{sample.quantity}</span>
            </div>
          </div>

          {sample.description && (
            <div className="detail-full">
              <span className="label">Description</span>
              <p>{sample.description}</p>
            </div>
          )}
        </div>

        <div className="detail-card">
          <h3>Location & Supply</h3>
          <div className="detail-row">
            <div className="detail-item">
              <span className="label">Location</span>
              <span className="value">{sample.location || '-'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Supplier</span>
              <span className="value">{sample.supplier || '-'}</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="label">Batch Number</span>
              <span className="value">{sample.batchNumber || '-'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Date Received</span>
              <span className="value">{new Date(sample.dateReceived).toLocaleDateString()}</span>
            </div>
          </div>

          {sample.expiryDate && (
            <div className="detail-row">
              <div className="detail-item">
                <span className="label">Expiry Date</span>
                <span className="value">{new Date(sample.expiryDate).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>

        {sample.notes && (
          <div className="detail-card">
            <h3>Notes</h3>
            <p>{sample.notes}</p>
          </div>
        )}

        <div className="detail-card">
          <h3>Metadata</h3>
          <div className="detail-row">
            <div className="detail-item">
              <span className="label">Created By</span>
              <span className="value">
                {sample.createdBy?.name || 'System'}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Last Updated</span>
              <span className="value">{new Date(sample.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SampleDetail;