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

export const lessons = {
  get,
  me,
  me_first,
};
