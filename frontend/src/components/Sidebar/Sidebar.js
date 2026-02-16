import React from 'react';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h3>SQL Practice</h3>
        <ul className="sidebar-menu">
          <li><a href="/">All Assignments</a></li>
          <li><a href="/">Beginner</a></li>
          <li><a href="/">Intermediate</a></li>
          <li><a href="/">Advanced</a></li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;