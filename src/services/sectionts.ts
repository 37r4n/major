import axios from 'axios';
import { config } from '../config';
import { Section } from '../models/section';
import { sectionAdapter } from '../adapters/section-adapter';

export const get = async ({ course_id }: { course_id: string }): Promise<Section[]> => {
  const response = await axios.get(`${config.api.base}/academy/courses/${course_id}/sections`);
  if (response?.data?.data) return response.data.data.map(sectionAdapter);
  throw new Error();
};


export const update = async ({ id, title, description, }: { id: string, course_id: string, title: string, description: string | null }): Promise<Section> => {
  const response = await axios.patch(`${config.api.base}/academy/sections/${id}`, {
    title, description
  });

  if (response?.data?.data) return sectionAdapter(response.data.data);
  throw new Error();
};

export const create = async ({ course_id, title, description, display_order }: { course_id: string, title: string, description: string | null, display_order: number }): Promise<Section> => {
  const response = await axios.post(`${config.api.base}/academy/sections`, {
    title, description, course_id,
    display_order
  });

  if (response?.data?.data) return sectionAdapter(response.data.data);
  throw new Error();
};


export const me = async ({ course_id }: { course_id: string }): Promise<Section[]> => {
  const response = await axios.get(`${config.api.base}/me/academy/courses/${course_id}/sections`);
  if (response?.data?.data) return response.data.data.map(sectionAdapter);
  throw new Error();
};

export const sections = {
  get,
  update,
  create,
  me,
};
