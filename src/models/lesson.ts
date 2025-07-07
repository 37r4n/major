export type Lesson = {
  id: string;
  section_id: string;
  title: string;
  description: string | null;
  display_order: number;
  duration_seconds: number;
  thumbnail_url: string | null;
  background_url: string | null;
  resource_url: string;
  is_unlocked: boolean;
};
