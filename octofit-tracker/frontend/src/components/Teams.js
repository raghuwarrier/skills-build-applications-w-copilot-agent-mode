import React, { useCallback, useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  const loadTeams = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Teams API endpoint:', endpoint);
      const response = await fetch(endpoint);
      const data = await response.json();
      const normalized = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
      console.log('Fetched teams data:', data);
      setTeams(normalized);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Unable to load teams right now.');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  if (loading) return <div className="loading">Loading teams...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="data-section">
      <h2>Teams</h2>
      <button className="action-button" onClick={loadTeams}>Refresh Teams</button>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {teams.length === 0 ? (
            <tr>
              <td colSpan="2">No team data available.</td>
            </tr>
          ) : (
            teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <td>{team.name || `Team ${idx + 1}`}</td>
                <td>{JSON.stringify(team)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Teams;
