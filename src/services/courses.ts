import axios from 'axios';
import { config } from '../config';
import { Course } from '../models/course';
import { courseAdapter } from '../adapters/course-adapter';

export const get = async (): Promise<Course[]> => {
  const response = await axios.get(`${config.api.base}/academy/courses`);
  if (response?.data?.data) return response.data.data.map(courseAdapter);
  throw new Error();
};

export const create = async ({ title, description, author_id, manual_url }: { title: string, description: string | null, author_id: string, manual_url: string | null }): Promise<Course> => {
  const response = await axios.post(`${config.api.base}/academy/courses`, {
    title, description, author_id, manual_url
  });

  if (response?.data?.data) return courseAdapter(response.data.data);
  throw new Error();
};

export const update = async ({ id, title, description, author_id, manual_url }: { id: string, title: string, description: string | null, author_id: string, manual_url: string | null }): Promise<Course> => {
  const response = await axios.patch(`${config.api.base}/academy/courses/${id}`, {
    title, description, author_id, manual_url
  });

  if (response?.data?.data) return courseAdapter(response.data.data);
  throw new Error();
};

export const me = async (): Promise<Course[]> => {
  const response = await axios.get(`${config.api.base}/me/academy/courses`);
  if (response?.data?.data) return response.data.data.map(courseAdapter);
  throw new Error();
};

export const courses = {
  get,
  update,
  create,
  me,
};
