const express = require('express');
const router = express.Router();
const { pgPool } = require('../config/database');

// Execute SQL query
router.post('/', async (req, res) => {
  const { query, assignmentId } = req.body;
  
  if (!query || !assignmentId) {
    return res.status(400).json({ error: 'Query and assignment ID are required' });
  }
  
  // Basic security: Only allow SELECT queries in demo
  const upperQuery = query.toUpperCase().trim();
  if (!upperQuery.startsWith('SELECT')) {
    return res.status(400).json({ 
      success: false,
      error: 'Only SELECT queries are allowed in demo mode' 
    });
  }
  
  // Prevent destructive operations
  const forbiddenKeywords = ['DROP', 'TRUNCATE', 'DELETE', 'UPDATE', 'INSERT', 'CREATE', 'ALTER'];
  for (const keyword of forbiddenKeywords) {
    if (upperQuery.includes(keyword)) {
      return res.status(400).json({
        success: false,
        error: `Query contains forbidden keyword: ${keyword}`
      });
    }
  }
  
  const client = await pgPool.connect();
  const startTime = Date.now();
  
  try {
    const result = await client.query(query);
    const executionTime = Date.now() - startTime;
    
    res.json({
      success: true,
      columns: result.fields ? result.fields.map(f => f.name) : [],
      rows: result.rows,
      rowCount: result.rowCount,
      executionTime,
    });
  } catch (error) {
    console.error('Query execution error:', error.message);
    res.json({
      success: false,
      error: error.message,
      executionTime: Date.now() - startTime,
    });
  } finally {
    client.release();
  }
});

module.exports = router;