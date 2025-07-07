import { useEffect, useState } from 'react';
import { GalleryTemplate } from '../templates/gallery-template';
import { useAuth } from '../hooks/auth';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { config } from '../config';
import { useTranslation } from 'react-i18next';
import { services } from '../services';
import { Course } from '../models/course';
import { Section } from '../models/section';
import { Lesson } from '../models/lesson';
import { CinemaTemplate } from '../templates/cinema-template';
import { IconBack } from '../icons/icon-back';

export const UserCoursesPage = ({ pathname }: { pathname: string }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const translation = useTranslation();
  const location = useLocation();
  const { '*': params } = useParams();

  const [course_id, section_id, lesson_id] = params?.split('/') ?? [];
  const [courses, setCourses] = useState<Course[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  const getMyCourses = async () => {
    const response = await services.courses.me();
    setCourses(response);
  };

  const getMySections = async () => {
    const response = await services.sections.me({ course_id });
    setSections(response);
  };

  const getMyLessons = async () => {
    const response = await services.lessons.me({ course_id, section_id });
    setLessons(response);
  };

  const getMyLesson = async () => {
    const response = await services.lessons.me_first({ course_id, section_id, lesson_id });
    setLesson(response);
    await services.progress.create({ course_id, section_id, lesson_id });
  };

  useEffect(() => {
    if (!course_id && !section_id && !lesson_id) getMyCourses();
  }, [course_id, section_id, lesson_id]);

  useEffect(() => {
    if (course_id && !section_id && !lesson_id) getMySections();
  }, [course_id, section_id, lesson_id]);

  useEffect(() => {
    if (course_id && section_id && !lesson_id) getMyLessons();
  }, [course_id, section_id, lesson_id]);

  useEffect(() => {
    if (course_id && section_id && lesson_id) getMyLesson();
  }, [course_id, section_id, lesson_id]);

  if (course_id && section_id && lesson_id) {
    return (
      <CinemaTemplate
        navbar={{
          user: auth.me,

          links: [
            {
              title: translation.t('user.courses.navbar.home'),
              onClick: () => navigate(config.pages.user.home),
            },

            {
              title: translation.t('user.courses.navbar.courses'),
              onClick: () => navigate(location.pathname),
            },
          ],

          actions: [
            {
              content: <IconBack onClick={() => navigate(`${pathname}/${course_id}/${section_id}`)} />,
            },
          ],
        }}
        src={lesson?.resource_url}
      />
    );
  }

  if (course_id && section_id) {
    return (
      <GalleryTemplate
        navbar={{
          user: auth.me,

          links: [
            {
              title: translation.t('courses.lessons.navbar.home'),
              onClick: () => navigate(config.pages.user.home),
            },

            {
              title: translation.t('courses.lessons.navbar.courses'),
              onClick: () => navigate(location.pathname),
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
          isLocked: !lesson.is_unlocked,
          onClick: () => navigate(`${pathname}/${course_id}/${section_id}/${lesson.id}`),
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
              title: translation.t('courses.sections.navbar.home'),
              onClick: () => navigate(config.pages.user.home),
            },

            {
              title: translation.t('courses.sections.navbar.courses'),
              onClick: () => navigate(location.pathname),
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
          isLocked: !section.is_unlocked,
          onClick: () => navigate(`${pathname}/${course_id}/${section.id}`),
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
            title: translation.t('courses.courses.navbar.home'),
            onClick: () => navigate(config.pages.user.home),
          },

          {
            title: translation.t('courses.courses.navbar.courses'),
            onClick: () => navigate(location.pathname),
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
        onClick: () => navigate(`${pathname}/${course.id}`),
      }))}
    />
  );
};
