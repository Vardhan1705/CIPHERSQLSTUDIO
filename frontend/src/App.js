// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AssignmentList from './pages/AssignmentList/AssignmentList';
import AssignmentAttempt from './pages/AssignmentAttempt/AssignmentAttempt';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
  };

  const handleRegister = (userData) => {
    // In real app, this would handle registration
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<AssignmentList />} />
          <Route path="/assignment/:id" element={<AssignmentAttempt />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Register onRegister={handleRegister} />
              )
            } 
          />
          <Route 
  path="/profile" 
  element={
    isAuthenticated ? (
      <Profile />
    ) : (
      <Navigate to="/login" replace />
    )
  } 
/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;