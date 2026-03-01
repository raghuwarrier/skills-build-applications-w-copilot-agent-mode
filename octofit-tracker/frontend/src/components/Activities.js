import React, { useCallback, useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  const loadActivities = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Activities API endpoint:', endpoint);
      const response = await fetch(endpoint);
      const data = await response.json();
      const normalized = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
      console.log('Fetched activities data:', data);
      setActivities(normalized);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError('Unable to load activities right now.');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loading) return <div className="loading">Loading activities...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="data-section">
      <h2>Activities</h2>
      <button className="action-button" onClick={loadActivities}>Refresh Activities</button>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {activities.length === 0 ? (
            <tr>
              <td colSpan="2">No activity data available.</td>
            </tr>
          ) : (
            activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <td>{activity.name || activity.title || `Activity ${idx + 1}`}</td>
                <td>{JSON.stringify(activity)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Activities;
