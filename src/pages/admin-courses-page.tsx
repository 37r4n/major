import { useEffect, useState } from 'react';
import { Course } from '../models/course';
import { services } from '../services';
import { GalleryTemplate } from '../templates/gallery-template';
import { useDrawer } from '../contexts/drawer-context';
import { IconFolder } from '../icons/icon-folder';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Section } from '../models/section';
import { Lesson } from '../models/lesson';
import { useAuth } from '../hooks/auth';
import { useTranslation } from 'react-i18next';
import { config } from '../config';
import { User } from '../models/user';
import { FormCourse } from '../layouts/form-course';
import { IconCreate } from '../icons/icon-create';
import { FormSection } from '../layouts/form-section';
import { FormLesson } from '../layouts/form-lesson';

export const AdminCoursesPage = ({ pathname }: { pathname: string }) => {
  const navigate = useNavigate();
  const drawer = useDrawer();
  const auth = useAuth({ allowed_roles: [config.roles.admin] });
  const translation = useTranslation();
  const location = useLocation();
  const { '*': params } = useParams();

  const [course_id, section_id, lesson_id] = params?.split('/') ?? [];
  const [courses, setCourses] = useState<Course[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const getAllCourses = async () => {
    const response = await services.courses.get();
    setCourses(response);
  };

  const getAllSections = async () => {
    const response = await services.sections.get({ course_id });
    setSections(response);
  };

  const getAllLessons = async () => {
    const response = await services.lessons.get({ course_id, section_id });
    setLessons(response);
  };

  const getAllUsers = async () => {
    const response = await services.users.get({ limit: 9999 });
    setUsers(response);
  };

  const updateCourse = async ({ course }: { course: Course }) => {
    await services.courses.update({
      id: course.id,
      title: course.title,
      description: course.description,
      author_id: course.author.id,
      manual_url: course.manual_url,
    });

    await getAllCourses();
    drawer.close();
  };

  const createCourse = async ({ course }: { course: Course }) => {
    await services.courses.create({
      title: course.title,
      description: course.description,
      author_id: course.author.id,
      manual_url: course.manual_url,
    });

    await getAllCourses();
    drawer.close();
  };

  const updateSection = async ({ section }: { section: Section }) => {
    await services.sections.update({
      id: section.id,
      course_id: course_id,
      title: section.title,
      description: section.description,
    });

    await getAllSections();
    drawer.close();
  };

  const createSection = async ({ section }: { section: Section }) => {
    await services.sections.create({
      course_id: course_id,
      title: section.title,
      description: section.description,
      display_order: section.display_order,
    });

    await getAllSections();
    drawer.close();
  };

  const updateLesson = async ({ lesson }: { lesson: Lesson }) => {
    await services.lessons.update({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      display_order: lesson.display_order,
      resource_url: lesson.resource_url,
      duration_seconds: lesson.duration_seconds,
    });

    await getAllLessons();
    drawer.close();
  };

  const createLesson = async ({ lesson }: { lesson: Lesson }) => {
    await services.lessons.create({
      section_id: lesson.section_id,
      title: lesson.title,
      description: lesson.description,
      display_order: lesson.display_order,
      duration_seconds: lesson.duration_seconds,
      resource_url: lesson.resource_url,
    });

    await getAllLessons();
    drawer.close();
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (!course_id && !section_id && !lesson_id) getAllCourses();
  }, [course_id, section_id, lesson_id]);

  useEffect(() => {
    if (course_id && !section_id && !lesson_id) getAllSections();
  }, [course_id, section_id, lesson_id]);

  useEffect(() => {
    if (course_id && section_id && !lesson_id) getAllLessons();
  }, [course_id, section_id, lesson_id]);

  if (course_id && section_id) {
    return (
      <GalleryTemplate
        navbar={{
          user: auth.me,
          links: [
            {
              title: translation.t('admin-courses.lessons.navbar.home'),
              onClick: () => navigate(config.pages.admin.home),
            },

            {
              title: translation.t('admin-courses.lessons.navbar.courses'),
              onClick: () => navigate(location.pathname),
              is_active: true,
            },

            {
              title: translation.t('admin-courses.lessons.navbar.enrollments'),
              onClick: () => navigate(config.pages.admin.enrollments),
            },
          ],

          actions: [
            {
              content: <IconCreate />,
              onClick: () =>
                drawer.fire({
                  content: (
                    <div className="flex justify-center items-center h-full w-full">
                      <FormLesson
                        section_id={section_id}
                        title="Crear lección"
                        onSubmit={({ lesson }) => createLesson({ lesson })}
                        button="Guardar cambios"
                      />
                    </div>
                  ),
                }),
            },
          ],
        }}
        breadcrumbs={[
          { content: 'Cursos', onClick: () => navigate(`${pathname}`) },
          { content: 'Secciones', onClick: () => navigate(`${pathname}/${course_id}`) },
          { content: 'Lecciones', is_active: true },
        ]}
        items={lessons.map((lesson) => ({
          title: lesson.title,
          description: lesson.description,
          src: lesson.thumbnail_url,
          onClick: () =>
            drawer.fire({
              content: (
                <div className="flex flex-col gap-8 justify-center items-center h-full w-full">
                  <FormLesson
                    section_id={section_id}
                    title="Actualizar lección"
                    lesson={{ ...lesson }}
                    onSubmit={({ lesson }) => updateLesson({ lesson })}
                    button="Guardar cambios"
                  />

                  <IconFolder
                    onClick={() => {
                      navigate(`${pathname}/${course_id}/${section_id}/${lesson.id}`);
                      drawer.close();
                    }}
                  />
                </div>
              ),
            }),
        }))}
      />
    );
  }

  if (course_id) {
    return (
      <GalleryTemplate
        navbar={{
          user: auth.me,
          links: [
            {
              title: translation.t('admin-courses.sections.navbar.home'),
              onClick: () => navigate(config.pages.admin.home),
            },

            {
              title: translation.t('admin-courses.sections.navbar.courses'),
              onClick: () => navigate(location.pathname),
              is_active: true,
            },

            {
              title: translation.t('admin-courses.sections.navbar.enrollments'),
              onClick: () => navigate(config.pages.admin.enrollments),
            },
          ],

          actions: [
            {
              content: <IconCreate />,
              onClick: () =>
                drawer.fire({
                  content: (
                    <div className="flex justify-center items-center h-full w-full">
                      <FormSection
                        course_id={course_id}
                        title="Crear curso"
                        onSubmit={({ section }) => createSection({ section })}
                        button="Guardar cambios"
                      />
                    </div>
                  ),
                }),
            },
          ],
        }}
        breadcrumbs={[
          { content: 'Cursos', onClick: () => navigate(pathname) },
          { content: 'Secciones', is_active: true },
          { content: 'Lecciones', is_disabled: true },
        ]}
        items={sections.map((section) => ({
          title: section.title,
          description: section.description,
          src: section.thumbnail_url,
          onClick: () =>
            drawer.fire({
              content: (
                <div className="flex flex-col justify-center items-center h-full w-full gap-8">
                  <FormSection
                    title="Editar sección"
                    course_id={course_id}
                    section={section}
                    onSubmit={({ section }) => updateSection({ section })}
                    button="Guardar cambios"
                  />

                  <IconFolder
                    onClick={() => {
                      navigate(`${pathname}/${course_id}/${section.id}`);
                      drawer.close();
                    }}
                  />
                </div>
              ),
            }),
        }))}
      />
    );
  }

  return (
    <GalleryTemplate
      navbar={{
        user: auth.me,
        links: [
          {
            title: translation.t('admin-courses.courses.navbar.home'),
            onClick: () => navigate(config.pages.admin.home),
          },

          {
            title: translation.t('admin-courses.courses.navbar.courses'),
            onClick: () => navigate(location.pathname),
            is_active: true,
          },

          {
            title: translation.t('admin-courses.courses.navbar.enrollments'),
            onClick: () => navigate(config.pages.admin.enrollments),
          },
        ],

        actions: [
          {
            content: <IconCreate />,
            onClick: () =>
              drawer.fire({
                content: (
                  <div className="flex justify-center items-center h-full w-full">
                    <FormCourse
                      title="Crear curso"
                      authors={users}
                      onSubmit={({ course }) => createCourse({ course })}
                      button="Guardar cambios"
                    />
                  </div>
                ),
              }),
          },
        ],
      }}
      breadcrumbs={[
        { content: 'Cursos', is_active: true },
        { content: 'Secciones', is_disabled: true },
        { content: 'Lecciones', is_disabled: true },
      ]}
      items={courses.map((course) => ({
        title: course.title,
        description: course.description,
        src: course.thumbnail_url,
        onClick: () =>
          drawer.fire({
            content: (
              <div className="flex flex-col gap-8 justify-center items-center h-full w-full">
                <FormCourse
                  title="Actualizar curso"
                  course={{ ...course }}
                  authors={users}
                  onSubmit={({ course }) => updateCourse({ course })}
                  button="Guardar cambios"
                />

                <IconFolder
                  onClick={() => {
                    navigate(`${pathname}/${course.id}`);
                    drawer.close();
                  }}
                />
              </div>
            ),
          }),
      }))}
    />
  );
};
