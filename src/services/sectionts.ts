import axios from 'axios';
import { config } from '../config';
import { Section } from '../models/section';
import { sectionAdapter } from '../adapters/section-adapter';

export const get = async ({ course_id }: { course_id: string }): Promise<Section[]> => {
  const response = await axios.get(`${config.api.base}/academy/courses/${course_id}/sections`);
  if (response?.data?.data) return response.data.data.map(sectionAdapter);
  throw new Error();
};

export const me = async ({ course_id }: { course_id: string }): Promise<Section[]> => {
  const response = await axios.get(`${config.api.base}/me/academy/courses/${course_id}/sections`);
  if (response?.data?.data) return response.data.data.map(sectionAdapter);
  throw new Error();
};

export const sections = {
  get,
  me,
};
