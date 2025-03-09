import axios from 'axios';
import { Task } from "../types/task";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/tasks`,
});

export const fetchTasks = async () => {
  const response = await api.get('/');
  return response.data;
};

export const createTask = async (task: Omit<Task, "id" | "createdAt">) => {
    const response = await api.post('/', task);
    return response.data;
};

export const updateTask = async (id: number, task: Partial<Task>) => {
  const response = await api.put(`/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/${id}`);
};