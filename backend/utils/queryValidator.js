const validateSQL = (query) => {
  const trimmedQuery = query.trim().toUpperCase();
  
  // Only allow SELECT queries for safety
  if (!trimmedQuery.startsWith('SELECT')) {
    return {
      valid: false,
      error: 'Only SELECT queries are allowed in the sandbox'
    };
  }
  
  // Additional safety checks
  const dangerousKeywords = [
    'DROP', 'TRUNCATE', 'DELETE', 'UPDATE', 'INSERT', 
    'CREATE', 'ALTER', 'GRANT', 'REVOKE'
  ];
  
  for (const keyword of dangerousKeywords) {
    if (trimmedQuery.includes(keyword)) {
      return {
        valid: false,
        error: `SQL keyword '${keyword}' is not allowed in the sandbox`
      };
    }
  }
  
  return { valid: true };
};

module.exports = { validateSQL };