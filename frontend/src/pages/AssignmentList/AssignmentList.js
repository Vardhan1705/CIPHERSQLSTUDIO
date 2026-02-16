import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AssignmentList.scss';

const AssignmentList = () => {
  const [assignments] = useState([
    {
      _id: '1',
      title: 'Basic SELECT Query',
      description: 'Retrieve all columns from the employees table',
      difficulty: 'beginner',
      schema: {
        employees: [
          { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
          { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 }
        ]
      }
    },
    {
      _id: '2', 
      title: 'Filter with WHERE Clause',
      description: 'Find all employees in the Engineering department',
      difficulty: 'beginner',
      schema: {
        employees: [
          { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
          { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
          { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 }
        ]
      }
    },
    {
      _id: '3',
      title: 'Order Results with ORDER BY',
      description: 'List all employees ordered by salary in descending order',
      difficulty: 'intermediate',
      schema: {
        employees: [
          { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
          { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
          { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 }
        ]
      }
    },
    {
      _id: '4',
      title: 'JOIN Multiple Tables',
      description: 'Combine data from employees and departments tables',
      difficulty: 'intermediate',
      schema: {
        employees: [
          { id: 1, name: 'John Doe', department_id: 1, salary: 75000 },
          { id: 2, name: 'Jane Smith', department_id: 2, salary: 65000 }
        ],
        departments: [
          { id: 1, name: 'Engineering' },
          { id: 2, name: 'Marketing' }
        ]
      }
    },
    {
      _id: '5',
      title: 'GROUP BY with Aggregation',
      description: 'Calculate average salary by department',
      difficulty: 'advanced',
      schema: {
        employees: [
          { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
          { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
          { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 }
        ]
      }
    },
    {
      _id: '6',
      title: 'Subqueries Practice',
      description: 'Find employees with above-average salaries',
      difficulty: 'advanced',
      schema: {
        employees: [
          { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
          { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
          { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
          { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 }
        ]
      }
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.difficulty === filter;
  });

  return (
    <div className="assignment-list">
      <div className="page-header">
        <h1>SQL Practice Assignments</h1>
        <p>Improve your SQL skills with interactive exercises</p>
      </div>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'beginner' ? 'active' : ''}`}
          onClick={() => setFilter('beginner')}
        >
          Beginner
        </button>
        <button 
          className={`filter-btn ${filter === 'intermediate' ? 'active' : ''}`}
          onClick={() => setFilter('intermediate')}
        >
          Intermediate
        </button>
        <button 
          className={`filter-btn ${filter === 'advanced' ? 'active' : ''}`}
          onClick={() => setFilter('advanced')}
        >
          Advanced
        </button>
      </div>

      <div className="assignments-grid">
        {filteredAssignments.map((assignment) => (
          <div key={assignment._id} className="assignment-card">
            <div className="card-header">
              <span className={`difficulty-badge ${assignment.difficulty}`}>
                {assignment.difficulty}
              </span>
              <h3 className="card-title">{assignment.title}</h3>
            </div>
            
            <div className="card-body">
              <p className="card-description">{assignment.description}</p>
              
              <div className="schema-preview">
                <small>Sample tables: {Object.keys(assignment.schema || {}).join(', ')}</small>
              </div>
            </div>
            
            <div className="card-footer">
              <Link 
                to={`/assignment/${assignment._id}`}
                className="btn btn-primary"
              >
                Start Practice
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="no-results">
          <p>No assignments found for "{filter}" difficulty.</p>
          <button 
            className="btn btn-secondary"
            onClick={() => setFilter('all')}
          >
            Show All Assignments
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentList;