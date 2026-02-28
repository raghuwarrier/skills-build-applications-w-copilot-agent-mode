import React, { useCallback, useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  const loadWorkouts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Workouts API endpoint:', endpoint);
      const response = await fetch(endpoint);
      const data = await response.json();
      const normalized = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
      console.log('Fetched workouts data:', data);
      setWorkouts(normalized);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError('Unable to load workouts right now.');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  if (loading) return <div className="loading">Loading workouts...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="data-section">
      <h2>Workouts</h2>
      <button className="action-button" onClick={loadWorkouts}>Refresh Workouts</button>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {workouts.length === 0 ? (
            <tr>
              <td colSpan="2">No workout data available.</td>
            </tr>
          ) : (
            workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <td>{workout.name || workout.title || `Workout ${idx + 1}`}</td>
                <td>{JSON.stringify(workout)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Workouts;
