import { Lesson } from '../models/lesson';

export const lessonAdapter = (data: any): Lesson => ({
  id: data.id,
  section_id: data.section_id,
  title: data.title,
  description: data.description,
  display_order: data.display_order,
  duration_seconds: data.duration_seconds,
  background_url: data.background_url,
  thumbnail_url: data.thumbnail_url,
  resource_url: data.resource_url,
  is_unlocked: data.is_unlocked ?? true,
});
