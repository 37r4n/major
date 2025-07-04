import { Course } from '../models/course';

export const courseAdapter = (data: any): Course => ({
  id: data.id,
  title: data.title,
  description: data.description,
  thumbnail_url: data.thumbnail_url,
  background_url: data.background_url,
  manual_url: data.manual_url,
  author: {
    id: data.author.id,
    name: data.author.name,
    avatar_url: data.author.avatar_url,
  },
});
