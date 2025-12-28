const validateQuery = (req, res, next) => {
  const { query } = req.body;
  
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'SQL query is required' });
  }
  
  // Basic SQL injection protection
  const dangerousPatterns = [
    /DROP\s+DATABASE/i,
    /DROP\s+TABLE/i,
    /TRUNCATE\s+TABLE/i,
    /DELETE\s+FROM/i,
    /UPDATE\s+.+\s+SET/i,
    /INSERT\s+INTO/i,
    /CREATE\s+TABLE/i,
    /ALTER\s+TABLE/i,
    /--/, // SQL comments
    /\/\*.*\*\//, // Multi-line comments
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(query)) {
      return res.status(400).json({ 
        error: 'This SQL operation is not allowed in the sandbox environment' 
      });
    }
  }
  
  next();
};

module.exports = { validateQuery };