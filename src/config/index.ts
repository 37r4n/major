export const config = {
  api: {
    base: 'http://82.29.197.244:8080/api/v1',
  },

  roles: {
    admin: 'admin_major',
  },

  pages: {
    login: '/login',

    user: {
      home: '/',
      courses: '/courses',
    },

    admin: {
      home: '/admin',
      courses: '/admin/courses',
      enrollments: '/admin/enrollments',
    },
  },
};
