const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const { pgPool } = require('../config/database');

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find().select('-expectedQuery');
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single assignment
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    // Don't send expected query to client
    const assignmentData = assignment.toObject();
    delete assignmentData.expectedQuery;
    
    res.json(assignmentData);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Initialize assignment database (create tables and insert sample data)
router.post('/:id/initialize', async (req, res) => {
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
      
      res.json({ success: true, message: 'Database initialized successfully' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Initialization error:', error);
    res.status(500).json({ error: 'Failed to initialize database' });
  }
});

module.exports = router;