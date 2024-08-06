/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_URL = "https://api.todo.fr.to/tasks";

export const createTask = async (taskData: any) => {
  const response = await axios.post(`${BASE_URL}/tasks`, taskData);
  return response.data;
};

export const fetchTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks`);
  return response.data;
};

export const updateTask = async (id: string, updates: any) => {
  const response = await axios.patch(`${BASE_URL}/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/tasks/${id}`);
  return response.data;
};

export const getSummary = async (day: any) => {
  const response = await axios.get(`${BASE_URL}/summary/${day}`);
  return response.data;
};
