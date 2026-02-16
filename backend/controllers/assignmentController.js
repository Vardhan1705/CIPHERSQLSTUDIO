const Assignment = require('../models/Assignment');
const { pgPool } = require('../config/database');

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().select('-expectedResult -sampleData');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    // Don't send expected result to client
    const assignmentData = assignment.toObject();
    delete assignmentData.expectedResult;
    
    res.json(assignmentData);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.initializeAssignmentDatabase = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    const client = await pgPool.connect();
    
    try {
      // Create tables based on schema definition
      for (const [tableName, columns] of Object.entries(assignment.schemaDefinition)) {
        const columnDefinitions = columns.map(col => 
          `${col.name} ${col.type}${col.nullable ? '' : ' NOT NULL'}`
        ).join(', ');
        
        await client.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
        await client.query(`CREATE TABLE ${tableName} (${columnDefinitions})`);
        
        // Insert sample data
        if (assignment.sampleData[tableName]) {
          for (const row of assignment.sampleData[tableName]) {
            const keys = Object.keys(row);
            const values = Object.values(row);
            const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
            
            await client.query(
              `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`,
              values
            );
          }
        }
      }
      
      res.json({ message: 'Database initialized successfully' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Initialization error:', error);
    res.status(500).json({ error: 'Failed to initialize database' });
  }
};