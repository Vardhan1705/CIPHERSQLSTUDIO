import api from './api';

export const getAssignments = async () => {
  try {
    const response = await api.get('/assignments');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAssignmentById = async (id) => {
  try {
    const response = await api.get(`/assignments/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const initializeAssignment = async (id) => {
  try {
    const response = await api.post(`/assignments/${id}/initialize`);
    return response;
  } catch (error) {
    throw error;
  }
};