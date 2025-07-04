import axios from 'axios';
import { config } from '../config';
import { Enrollment } from '../models/enrollment';
import { enrollmentAdapter } from '../adapters/enrollment-adapter';

export const get = async ({ course_id }: { course_id: string }): Promise<Enrollment[]> => {
  const response = await axios.get(`${config.api.base}/academy/courses/${course_id}/enrollments`, {
    params: { course_id },
  });

  if (response?.data?.data) return response.data.data.map(enrollmentAdapter);
  throw new Error();
};

export const create = async ({ user_id, course_id }: { user_id: string; course_id: string }): Promise<Enrollment> => {
  const response = await axios.post(`${config.api.base}/academy/enrollments`, {
    user_id,
    course_id,
  });

  if (response?.data?.data) return enrollmentAdapter(response.data.data);
  throw new Error();
};

export const enrollments = {
  create,
  get,
};
