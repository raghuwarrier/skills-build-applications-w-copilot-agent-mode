import React, { useCallback, useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Users API endpoint:', endpoint);
      const response = await fetch(endpoint);
      const data = await response.json();
      const normalized = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
      console.log('Fetched users data:', data);
      setUsers(normalized);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Unable to load users right now.');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="data-section">
      <h2>Users</h2>
      <button className="action-button" onClick={loadUsers}>Refresh Users</button>
      <table className="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="2">No user data available.</td>
            </tr>
          ) : (
            users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td>{user.username || user.name || `User ${idx + 1}`}</td>
                <td>{JSON.stringify(user)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Users;
