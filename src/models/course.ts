export type Course = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  background_url: string | null;
  manual_url: string | null;
  author: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
};
