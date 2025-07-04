import axios from 'axios';
import { config } from '../config';
import { Course } from '../models/course';
import { courseAdapter } from '../adapters/course-adapter';

export const get = async (): Promise<Course[]> => {
  const response = await axios.get(`${config.api.base}/academy/courses`);
  if (response?.data?.data) return response.data.data.map(courseAdapter);
  throw new Error();
};

export const me = async (): Promise<Course[]> => {
  const response = await axios.get(`${config.api.base}/me/academy/courses`);
  if (response?.data?.data) return response.data.data.map(courseAdapter);
  throw new Error();
};

export const courses = {
  get,
  me,
};
