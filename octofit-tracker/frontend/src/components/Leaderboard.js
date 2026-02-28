import React, { useCallback, useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Leaderboard API endpoint:', endpoint);
      const response = await fetch(endpoint);
      const data = await response.json();
      const normalized = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
      console.log('Fetched leaderboard data:', data);
      setLeaders(normalized);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Unable to load leaderboard right now.');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  if (loading) return <div className="loading">Loading leaderboard...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="data-section">
      <h2>Leaderboard</h2>
      <button className="action-button" onClick={loadLeaderboard}>Refresh Leaderboard</button>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {leaders.length === 0 ? (
            <tr>
              <td colSpan="2">No leaderboard data available.</td>
            </tr>
          ) : (
            leaders.map((leader, idx) => (
              <tr key={leader.id || idx}>
                <td>{leader.name || leader.username || `Member ${idx + 1}`}</td>
                <td>{JSON.stringify(leader)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Leaderboard;
