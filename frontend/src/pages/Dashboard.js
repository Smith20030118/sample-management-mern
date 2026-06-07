import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalSamples: 0,
    activeSamples: 0,
    inReview: 0,
  });
  const [recentSamples, setRecentSamples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/samples');
      const samples = response.data;

      setStats({
        totalSamples: samples.length,
        activeSamples: samples.filter(s => s.status === 'Active').length,
        inReview: samples.filter(s => s.status === 'In Review').length,
      });

      setRecentSamples(samples.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome to Sample Management System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Total Samples</h3>
            <p className="stat-value">{stats.totalSamples}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Active Samples</h3>
            <p className="stat-value">{stats.activeSamples}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-info">
            <h3>In Review</h3>
            <p className="stat-value">{stats.inReview}</p>
          </div>
        </div>
      </div>

      <div className="recent-samples">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Recent Samples</h3>
          <Link to="/samples/new" className="button-primary">Add Sample</Link>
        </div>

        {recentSamples.length > 0 ? (
          <table className="samples-table">
            <thead>
              <tr>
                <th>Sample ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentSamples.map((sample) => (
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
                  <td>
                    <Link to={`/samples/${sample._id}`} className="action-link">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No samples yet. <Link to="/samples/new">Create one</Link></p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;