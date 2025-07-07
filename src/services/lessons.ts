import axios from 'axios';
import { config } from '../config';
import { Lesson } from '../models/lesson';
import { lessonAdapter } from '../adapters/lesson-adapter';

export const get = async ({ course_id, section_id }: { course_id: string; section_id: string }): Promise<Lesson[]> => {
  const response = await axios.get(`${config.api.base}/academy/courses/${course_id}/sections/${section_id}/lessons`);
  if (response?.data?.data) return response.data.data.map(lessonAdapter);
  throw new Error();
};

export const me = async ({ course_id, section_id }: { course_id: string; section_id: string }): Promise<Lesson[]> => {
  const response = await axios.get(`${config.api.base}/me/academy/courses/${course_id}/sections/${section_id}/lessons`);
  if (response?.data?.data) return response.data.data.map(lessonAdapter);
  throw new Error();
};

export const me_first = async ({
  course_id,
  section_id,
  lesson_id,
}: {
  course_id: string;
  section_id: string;
  lesson_id: string;
}): Promise<Lesson> => {
  const response = await axios.get(
    `${config.api.base}/me/academy/courses/${course_id}/sections/${section_id}/lessons/${lesson_id}`,
  );
  if (response?.data?.data) return lessonAdapter(response.data.data);
  throw new Error();
};

export const update = async ({
  id,
  title,
  description,
  display_order,
  resource_url,
  duration_seconds,
}: {
  id: string;
  title: string;
  description: string | null;
  display_order: number;
  resource_url: string;
  duration_seconds: number;
}): Promise<Lesson> => {
  const response = await axios.patch(`${config.api.base}/academy/lessons/${id}`, {
    id,
    title,
    description,
    display_order,
    resource_url,
    duration_seconds,
  });

  if (response?.data?.data) return lessonAdapter(response.data.data);
  throw new Error();
};

export const create = async ({
  section_id,
  title,
  description,
  display_order,
  duration_seconds,
  resource_url,
}: {
  section_id: string;
  title: string;
  description: string | null;
  display_order: number;
  duration_seconds: number;
  resource_url: string;
}): Promise<Lesson> => {
  const response = await axios.post(`${config.api.base}/academy/lessons`, {
    section_id,
    title,
    description,
    display_order,
    duration_seconds,
    resource_url,
  });

  if (response?.data?.data) return lessonAdapter(response.data.data);
  throw new Error();
};

export const lessons = {
  get,
  me,
  me_first,
  update,
  create,
};
