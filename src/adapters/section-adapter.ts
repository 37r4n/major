import { Section } from '../models/section';

export const sectionAdapter = (data: any): Section => ({
  id: data.id,
  course_id: data.course_id,
  title: data.title,
  description: data.description,
  display_order: data.display_order,
  thumbnail_url: data.thumbnail_url,
  background_url: data.background_url,
  is_unlocked: data.is_unlocked ?? true,
});
