import axios from 'axios';

const BASE_URL = 'https://fe-task-api.mainstack.io';

export const getRequest = async <T>(endpoint: string): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const res = await axios.get<T>(url);
  return res.data;
};
