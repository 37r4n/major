import { Enrollment } from '../models/enrollment';

export const enrollmentAdapter = (data: any): Enrollment => ({
  id: data.id,

  user: {
    id: data.user.id,
    code: data.user.code,
    name: data.user.name,
    avatar_url: data.user.avatar_url,
  },

  course: {
    id: data.course.id,
    title: data.course?.title ?? null,
    description: data.course?.description ?? null,
    thumbnail_url: data.course.thumbnail_url,
    background_url: data.course.background_url,
    manual_url: data.course?.manual_url ?? null,

    author: {
      id: data.course.author?.id ?? null,
      code: data.course.author?.code ?? null,
      name: data.course.author?.name ?? null,
      avatar_url: data.course.author?.avatar_url ?? null,
    },
  },
});
