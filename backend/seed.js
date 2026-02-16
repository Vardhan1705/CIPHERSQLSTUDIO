const mongoose = require('mongoose');
const Assignment = require('./models/Assignment');
require('dotenv').config();

const sampleAssignments = [
  {
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
    expectedResult: {
      columns: ['id', 'name', 'department', 'salary'],
      rows: [
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
        { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 },
        { id: 5, name: 'Charlie Wilson', department: 'Marketing', salary: 60000 },
      ]
    },
    hints: [
      'Use the SELECT statement to retrieve data from a table',
      'The asterisk (*) symbol selects all columns',
      'Specify the table name after the FROM keyword',
    ]
  },
  {
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
        { id: 5, name: 'Charlie Wilson', department: 'Marketing', salary: 60000 },
      ]
    },
    expectedResult: {
      columns: ['id', 'name', 'department', 'salary'],
      rows: [
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
      ]
    },
    hints: [
      'Use the WHERE clause to filter results',
      'String values need to be enclosed in single quotes',
      'Use the = operator for exact matches',
    ]
  },
  {
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
    expectedResult: {
      columns: ['id', 'name', 'department', 'salary'],
      rows: [
        { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 80000 },
        { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
        { id: 5, name: 'Charlie Wilson', department: 'Marketing', salary: 60000 },
        { id: 4, name: 'Alice Brown', department: 'HR', salary: 55000 },
      ]
    },
    hints: [
      'Use ORDER BY to sort results',
      'DESC keyword sorts in descending order',
      'You can sort by column name',
    ]
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://admin:securepassword123@localhost:27017/ciphersqlstudio?authSource=admin');
    console.log('Connected to MongoDB');
    
    // Clear existing assignments
    await Assignment.deleteMany({});
    console.log('Cleared existing assignments');
    
    // Insert sample assignments
    await Assignment.insertMany(sampleAssignments);
    console.log(`Inserted ${sampleAssignments.length} sample assignments`);
    
    // Display created assignments
    const assignments = await Assignment.find().select('title difficulty');
    console.log('\nAvailable assignments:');
    assignments.forEach((assignment, index) => {
      console.log(`${index + 1}. ${assignment.title} (${assignment.difficulty})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();