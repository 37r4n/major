import axios from 'axios';
import { config } from '../config';
import { Progress } from '../models/progress';
import { progressAdapter } from '../adapters/progress_adapter';

export const create = async ({
  course_id,
  section_id,
  lesson_id,
}: {
  course_id: string;
  section_id: string;
  lesson_id: string;
}): Promise<Progress> => {
  const response = await axios.post(
    `${config.api.base}/me/academy/courses/${course_id}/sections/${section_id}/lessons/${lesson_id}/progress`,
  );
  if (response?.data?.data) return progressAdapter(response.data.data);
  throw new Error();
};

export const progress = {
  create,
};
