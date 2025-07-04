export type Enrollment = {
  id: string;

  user: {
    id: string;
    code: string;
    name: string;
    avatar_url: string | null;
  };

  course: {
    id: string;
    title: string;
    description: string;
    thumbnail_url: string;
    background_url: string;
    manual_url: string;

    author: {
      id: string;
      code: string;
      name: string;
      avatar_url: string;
    };
  };
};
