import { Progress } from '../models/progress';

export const progressAdapter = (data: any): Progress => ({
  id: data.id,
  user_id: data.user_id,
  lesson_id: data.lesson_id,
});
