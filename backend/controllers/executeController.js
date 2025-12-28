const { pgPool } = require('../config/database');
const Attempt = require('../models/Attempt');

exports.executeQuery = async (req, res) => {
  const { query, assignmentId } = req.body;
  
  if (!query || !assignmentId) {
    return res.status(400).json({ error: 'Query and assignment ID are required' });
  }
  
  const client = await pgPool.connect();
  const startTime = Date.now();
  
  try {
    const result = await client.query(query);
    const executionTime = Date.now() - startTime;
    
    // Save attempt (optional - if user is authenticated)
    if (req.user) {
      const attempt = new Attempt({
        userId: req.user._id,
        assignmentId,
        query,
        result: {
          rowCount: result.rowCount,
          columns: result.fields?.map(f => f.name) || [],
        },
        executionTime,
      });
      await attempt.save();
    }
    
    res.json({
      success: true,
      columns: result.fields ? result.fields.map(f => f.name) : [],
      rows: result.rows,
      rowCount: result.rowCount,
      executionTime,
    });
  } catch (error) {
    console.error('Query execution error:', error);
    res.json({
      success: false,
      error: error.message,
      executionTime: Date.now() - startTime,
    });
  } finally {
    client.release();
  }
};