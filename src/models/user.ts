export type User = {
  id: string;
  code: string;
  name: string;
  is_active: boolean;
  avatar_url: string | null;
  roles: {
    id: string;
    name: string;
  }[];
};
