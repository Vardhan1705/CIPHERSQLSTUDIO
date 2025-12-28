const Assignment = require('../models/Assignment');
const openai = require('../config/openai');

exports.getHint = async (req, res) => {
  try {
    const { userQuery, previousHints = [] } = req.body;
    const assignment = await Assignment.findById(req.params.assignmentId);
    
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    // Construct prompt for LLM
    const prompt = `You are an SQL tutor helping a student. Provide helpful hints but NEVER give the complete solution.

Assignment: ${assignment.title}
Description: ${assignment.description}

Schema Definition:
${JSON.stringify(assignment.schemaDefinition, null, 2)}

Student's Current Query:
${userQuery || 'No query yet'}

Previous hints given: ${previousHints.join(', ') || 'None'}

Provide a brief, helpful hint that:
1. Guides the student in the right direction
2. Mentions relevant SQL concepts needed
3. Points out potential issues in their current query (if any)
4. Does NOT give the complete answer
5. Is encouraging and educational
6. Keep the response under 100 words

Hint:`;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful SQL tutor who provides guidance without giving away solutions. Always respond with concise hints."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    
    const hint = completion.choices[0].message.content.trim();
    
    res.json({
      hint,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Hint generation error:', error);
    // Fallback to stored hints if OpenAI fails
    const assignment = await Assignment.findById(req.params.assignmentId);
    if (assignment && assignment.hints && assignment.hints.length > 0) {
      const randomHint = assignment.hints[Math.floor(Math.random() * assignment.hints.length)];
      res.json({
        hint: randomHint,
        timestamp: new Date().toISOString(),
        source: 'fallback',
      });
    } else {
      res.status(500).json({ error: 'Failed to generate hint' });
    }
  }
};