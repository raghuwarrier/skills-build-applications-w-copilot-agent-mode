import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-shell">
        <header className="app-header">
          <img
            src="/octofitapp-small.png"
            alt="Octofit Tracker Logo"
            className="app-logo"
          />
          <div>
            <h1>Octofit Tracker</h1>
            <p>Track activity, teams, and performance in one dashboard.</p>
          </div>
        </header>

        <nav className="app-nav">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/activities">Activities</NavLink></li>
            <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
            <li><NavLink to="/teams">Teams</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/workouts">Workouts</NavLink></li>
          </ul>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<div className="home-card"><h2>Welcome to Octofit Tracker</h2><p>Select a section from the menu to view live API data.</p></div>} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
