export type Section = {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  display_order: number;
  thumbnail_url: string | null;
  background_url: string | null;
  manual_url: string | null;
  is_unlocked: boolean;
};
