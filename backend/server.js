const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock assignments data
const mockAssignments = [
  // BEGINNER ASSIGNMENTS
  {
    _id: 'beginner1',
    title: 'Basic SELECT Query',
    description: 'Retrieve all columns from the employees table',
    difficulty: 'beginner',
    schemaDefinition: {
      employees: [
        { name: 'id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department', type: 'VARCHAR(50)', nullable: false },
        { name: 'salary', type: 'INTEGER', nullable: false },
      ]
    },
    sampleData: {
      employees: [
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
        { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 },
        { id: 5, name: 'Charlie Wilson', department: 'Marketing', salary: 60000 },
      ]
    },
    hints: [
      'Use SELECT * FROM employees to get all columns',
      'The asterisk (*) symbol selects all columns',
      'Remember to end your query with a semicolon',
      'Check that you are querying the correct table'
    ]
  },
  {
    _id: 'beginner2',
    title: 'Select Specific Columns',
    description: 'Retrieve only the name and department columns from employees',
    difficulty: 'beginner',
    schemaDefinition: {
      employees: [
        { name: 'id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department', type: 'VARCHAR(50)', nullable: false },
        { name: 'salary', type: 'INTEGER', nullable: false },
      ]
    },
    sampleData: {
      employees: [
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
        { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 },
      ]
    },
    hints: [
      'List column names separated by commas instead of using *',
      'Example: SELECT name, department FROM employees',
      'Column names are case-sensitive',
      'Make sure to spell column names correctly'
    ]
  },
  {
    _id: 'beginner3',
    title: 'Filter with WHERE Clause',
    description: 'Find all employees in the Engineering department',
    difficulty: 'beginner',
    schemaDefinition: {
      employees: [
        { name: 'id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department', type: 'VARCHAR(50)', nullable: false },
        { name: 'salary', type: 'INTEGER', nullable: false },
      ]
    },
    sampleData: {
      employees: [
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
        { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 },
      ]
    },
    hints: [
      'Use WHERE clause with department = "Engineering"',
      'String values need single quotes in SQL',
      'The = operator checks for exact matches',
      'Place WHERE clause after FROM'
    ]
  },
  
  // INTERMEDIATE ASSIGNMENTS
  {
    _id: 'intermediate1',
    title: 'Order Results with ORDER BY',
    description: 'List all employees ordered by salary in descending order',
    difficulty: 'intermediate',
    schemaDefinition: {
      employees: [
        { name: 'id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department', type: 'VARCHAR(50)', nullable: false },
        { name: 'salary', type: 'INTEGER', nullable: false },
      ]
    },
    sampleData: {
      employees: [
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
        { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 },
        { id: 5, name: 'Charlie Wilson', department: 'Marketing', salary: 60000 },
      ]
    },
    hints: [
      'Use ORDER BY salary DESC to sort by highest salary first',
      'DESC sorts in descending order, ASC for ascending',
      'You can order by multiple columns: ORDER BY department, salary',
      'ORDER BY goes at the end of the query'
    ]
  },
  {
    _id: 'intermediate2',
    title: 'Multiple Conditions with AND',
    description: 'Find Engineering employees with salary above 70000',
    difficulty: 'intermediate',
    schemaDefinition: {
      employees: [
        { name: 'id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department', type: 'VARCHAR(50)', nullable: false },
        { name: 'salary', type: 'INTEGER', nullable: false },
      ]
    },
    sampleData: {
      employees: [
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
        { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 },
        { id: 5, name: 'Charlie Wilson', department: 'Marketing', salary: 60000 },
      ]
    },
    hints: [
      'Use AND to combine multiple conditions',
      'Example: WHERE department = "Engineering" AND salary > 70000',
      '> operator for greater than comparisons',
      'Make sure both conditions are in the WHERE clause'
    ]
  },
  {
    _id: 'intermediate3',
    title: 'Count Rows',
    description: 'Count how many employees are in each department',
    difficulty: 'intermediate',
    schemaDefinition: {
      employees: [
        { name: 'id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department', type: 'VARCHAR(50)', nullable: false },
        { name: 'salary', type: 'INTEGER', nullable: false },
      ]
    },
    sampleData: {
      employees: [
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
        { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 },
        { id: 5, name: 'Charlie Wilson', department: 'Marketing', salary: 60000 },
      ]
    },
    hints: [
      'Use COUNT() function to count rows',
      'GROUP BY department to group results',
      'Example: SELECT department, COUNT(*) FROM employees GROUP BY department',
      'COUNT(*) counts all rows in each group'
    ]
  },
  
  // ADVANCED ASSIGNMENTS
  {
    _id: 'advanced1',
    title: 'JOIN Multiple Tables',
    description: 'Combine employee data with department information',
    difficulty: 'advanced',
    schemaDefinition: {
      employees: [
        { name: 'id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department_id', type: 'INTEGER', nullable: false },
        { name: 'salary', type: 'INTEGER', nullable: false },
      ],
      departments: [
        { name: 'id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(50)', nullable: false },
        { name: 'location', type: 'VARCHAR(50)', nullable: true },
      ]
    },
    sampleData: {
      employees: [
        { id: 1, name: 'John Doe', department_id: 1, salary: 75000 },
        { id: 2, name: 'Jane Smith', department_id: 2, salary: 65000 },
        { id: 3, name: 'Bob Johnson', department_id: 1, salary: 80000 },
        { id: 4, name: 'Alice Brown', department_id: 3, salary: 55000 },
      ],
      departments: [
        { id: 1, name: 'Engineering', location: 'Building A' },
        { id: 2, name: 'Marketing', location: 'Building B' },
        { id: 3, name: 'HR', location: 'Building C' },
      ]
    },
    hints: [
      'Use INNER JOIN to combine tables',
      'Specify the join condition with ON keyword',
      'Example: SELECT e.name, d.name FROM employees e JOIN departments d ON e.department_id = d.id',
      'Use table aliases (e, d) for cleaner queries'
    ]
  },
  {
    _id: 'advanced2',
    title: 'GROUP BY with Aggregation',
    description: 'Calculate average salary by department',
    difficulty: 'advanced',
    schemaDefinition: {
      employees: [
        { name: 'id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department', type: 'VARCHAR(50)', nullable: false },
        { name: 'salary', type: 'INTEGER', nullable: false },
      ]
    },
    sampleData: {
      employees: [
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
        { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 },
        { id: 5, name: 'Charlie Wilson', department: 'Marketing', salary: 60000 },
      ]
    },
    hints: [
      'Use AVG() function to calculate average',
      'GROUP BY department to group results',
      'Example: SELECT department, AVG(salary) FROM employees GROUP BY department',
      'You can use ROUND() to format the average'
    ]
  },
  {
    _id: 'advanced3',
    title: 'Subquery Practice',
    description: 'Find employees with above-average salaries',
    difficulty: 'advanced',
    schemaDefinition: {
      employees: [
        { name: 'id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department', type: 'VARCHAR(50)', nullable: false },
        { name: 'salary', type: 'INTEGER', nullable: false },
      ]
    },
    sampleData: {
      employees: [
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
        { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 },
        { id: 5, name: 'Charlie Wilson', department: 'Marketing', salary: 60000 },
      ]
    },
    hints: [
      'First calculate the average salary in a subquery',
      'Use WHERE salary > (SELECT AVG(salary) FROM employees)',
      'Subqueries must be enclosed in parentheses',
      'The subquery calculates the overall average salary'
    ]
  },
];

// Routes

// Get all assignments
app.get('/api/assignments', (req, res) => {
  res.json(mockAssignments);
});

// Get single assignment
app.get('/api/assignments/:id', (req, res) => {
  const assignment = mockAssignments.find(a => a._id === req.params.id);
  if (!assignment) {
    return res.status(404).json({ error: 'Assignment not found' });
  }
  res.json(assignment);
});

// Initialize assignment (mock - always success)
app.post('/api/assignments/:id/initialize', (req, res) => {
  res.json({ success: true, message: 'Database initialized successfully' });
});

// Execute SQL query (mock execution)
app.post('/api/execute', (req, res) => {
  const { query, assignmentId } = req.body;
  
  if (!query || !assignmentId) {
    return res.status(400).json({ 
      success: false,
      error: 'Query and assignment ID are required' 
    });
  }
  
  // Find the assignment
  const assignment = mockAssignments.find(a => a._id === assignmentId);
  if (!assignment) {
    return res.status(404).json({ 
      success: false,
      error: 'Assignment not found' 
    });
  }
  
  // Basic query validation
  const upperQuery = query.toUpperCase().trim();
  const cleanQuery = query.trim();
  
  // Check if query is empty
  if (!cleanQuery) {
    return res.json({
      success: false,
      error: 'Query cannot be empty'
    });
  }
  
  // Check if it's a SELECT query
  if (!upperQuery.startsWith('SELECT')) {
    return res.json({
      success: false,
      error: 'Only SELECT queries are allowed. Your query should start with SELECT.'
    });
  }
  
  // Check for SQL syntax errors
  if (!upperQuery.includes('FROM')) {
    return res.json({
      success: false,
      error: 'SQL syntax error: Missing FROM clause'
    });
  }
  
  // Check for table existence based on assignment
  const tableNames = Object.keys(assignment.schemaDefinition);
  let tableFound = false;
  for (const table of tableNames) {
    if (upperQuery.includes(table.toUpperCase())) {
      tableFound = true;
      break;
    }
  }
  
  if (!tableFound) {
    return res.json({
      success: false,
      error: `Table not found. Available tables: ${tableNames.join(', ')}`
    });
  }
  
  // Check for forbidden keywords
  const forbiddenKeywords = ['DROP', 'TRUNCATE', 'DELETE', 'UPDATE', 'INSERT', 'CREATE', 'ALTER'];
  for (const keyword of forbiddenKeywords) {
    if (upperQuery.includes(keyword)) {
      return res.json({
        success: false,
        error: `Security restriction: ${keyword} operations are not allowed`
      });
    }
  }
  
  // Simulate query execution with mock results
  const executionTime = Math.floor(Math.random() * 100) + 50; // 50-150ms
  
  // Generate appropriate mock results based on assignment
  let mockResults = [];
  let columns = [];
  
  // Check assignment type and generate appropriate results
  if (assignmentId === '1') {
    // Assignment 1: Basic SELECT
    if (upperQuery.includes('*') && upperQuery.includes('EMPLOYEES')) {
      columns = ['id', 'name', 'department', 'salary'];
      mockResults = assignment.sampleData.employees.slice(0, 3);
    } else if (upperQuery.includes('SELECT') && upperQuery.includes('EMPLOYEES')) {
      // Valid SELECT but not the expected one
      columns = ['id', 'name', 'department', 'salary'];
      mockResults = assignment.sampleData.employees.slice(0, 2);
    } else {
      return res.json({
        success: false,
        error: 'Query should select from the employees table'
      });
    }
  } 
  else if (assignmentId === '2') {
    // Assignment 2: WHERE clause
    if (upperQuery.includes("DEPARTMENT = 'ENGINEERING'")) {
      columns = ['id', 'name', 'department', 'salary'];
      mockResults = assignment.sampleData.employees
        .filter(emp => emp.department === 'Engineering')
        .slice(0, 3);
    } else if (upperQuery.includes('WHERE') && upperQuery.includes('DEPARTMENT')) {
      // WHERE clause but wrong department
      columns = ['id', 'name', 'department', 'salary'];
      mockResults = assignment.sampleData.employees
        .filter(emp => emp.department !== 'Engineering')
        .slice(0, 2);
      return res.json({
        success: true,
        columns,
        rows: mockResults,
        rowCount: mockResults.length,
        executionTime,
        hint: 'You filtered for the wrong department. Try department = "Engineering"'
      });
    } else {
      return res.json({
        success: false,
        error: 'Query should use WHERE clause to filter by department'
      });
    }
  }
  else if (assignmentId === '3') {
    // Assignment 3: ORDER BY
    if (upperQuery.includes('ORDER BY') && upperQuery.includes('SALARY') && upperQuery.includes('DESC')) {
      columns = ['id', 'name', 'department', 'salary'];
      mockResults = [...assignment.sampleData.employees]
        .sort((a, b) => b.salary - a.salary)
        .slice(0, 3);
    } else if (upperQuery.includes('ORDER BY')) {
      // ORDER BY but wrong column or direction
      columns = ['id', 'name', 'department', 'salary'];
      mockResults = assignment.sampleData.employees.slice(0, 3);
      return res.json({
        success: true,
        columns,
        rows: mockResults,
        rowCount: mockResults.length,
        executionTime,
        hint: 'Try ORDER BY salary DESC for descending order'
      });
    } else {
      return res.json({
        success: false,
        error: 'Query should use ORDER BY clause to sort results'
      });
    }
  }
  else {
    // For other assignments, return generic results
    columns = tableNames.flatMap(table => 
      assignment.schemaDefinition[table].map(col => col.name)
    ).slice(0, 4);
    
    if (columns.length === 0) columns = ['id', 'name', 'department', 'salary'];
    
    mockResults = assignment.sampleData[tableNames[0]]?.slice(0, 3) || [];
  }
  
  res.json({
    success: true,
    columns,
    rows: mockResults,
    rowCount: mockResults.length,
    executionTime,
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'CipherSQLStudio Mock API',
    assignments: mockAssignments.length
  });
});

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Mock backend server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`📋 Assignments: http://localhost:${PORT}/api/assignments`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log('\n📚 Available assignments:');
  mockAssignments.forEach((assignment, index) => {
    console.log(`${index + 1}. ${assignment.title} (${assignment.difficulty})`);
  });
});