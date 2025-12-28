import api from './api';

export const executeQuery = async (query, assignmentId) => {
  try {
    const response = await api.post('/execute', {
      query,
      assignmentId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getHint = async (assignmentId, userQuery, previousHints = []) => {
  try {
    const response = await api.post(`/hints/${assignmentId}`, {
      userQuery,
      previousHints,
    });
    return response;
  } catch (error) {
    throw error;
  }
};