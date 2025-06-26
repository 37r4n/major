export type Lesson = {
  id: string,
  section_id: string
  title: string;
  description: string | null;
  display_order: number;
  duration_seconds: number;
  thumbnail_url: string | null;
  background_url: string | null;
  manual_url: string | null
  author: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
};