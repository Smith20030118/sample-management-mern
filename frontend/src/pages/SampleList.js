import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SampleList.css';

function SampleList() {
  const [samples, setSamples] = useState([]);
  const [filteredSamples, setFilteredSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchSamples();
  }, []);

  useEffect(() => {
    filterSamples();
  }, [samples, searchTerm, filterStatus]);

  const fetchSamples = async () => {
    try {
      const response = await axios.get('/api/samples');
      setSamples(response.data);
    } catch (error) {
      console.error('Error fetching samples:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSamples = () => {
    let filtered = samples;

    if (searchTerm) {
      filtered = filtered.filter(
        sample =>
          sample.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sample.sampleId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'All') {
      filtered = filtered.filter(sample => sample.status === filterStatus);
    }

    setFilteredSamples(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sample?')) {
      try {
        await axios.delete(`/api/samples/${id}`);
        setSamples(samples.filter(s => s._id !== id));
      } catch (error) {
        console.error('Error deleting sample:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="sample-list">
      <div className="page-header">
        <h2>Samples</h2>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by Sample ID or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>In Review</option>
          <option>Archived</option>
        </select>
        <Link to="/samples/new" className="button-primary">Add New Sample</Link>
      </div>

      <div className="samples-container">
        {filteredSamples.length > 0 ? (
          <table className="samples-table">
            <thead>
              <tr>
                <th>Sample ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSamples.map((sample) => (
                <tr key={sample._id}>
                  <td>{sample.sampleId}</td>
                  <td>{sample.name}</td>
                  <td>{sample.category}</td>
                  <td>
                    <span className={`status-badge status-${sample.status.toLowerCase()}`}>
                      {sample.status}
                    </span>
                  </td>
                  <td>{sample.quantity}</td>
                  <td>{sample.location || '-'}</td>
                  <td>
                    <Link to={`/samples/${sample._id}`} className="action-btn view">View</Link>
                    <Link to={`/samples/${sample._id}/edit`} className="action-btn edit">Edit</Link>
                    <button onClick={() => handleDelete(sample._id)} className="action-btn delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No samples found. <Link to="/samples/new">Create one</Link></p>
        )}
      </div>
    </div>
  );
}

export default SampleList;