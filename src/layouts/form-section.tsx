import { useState } from 'react';
import { Button } from '../components/button';
import { Form } from '../components/form';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import { Section } from '../models/section';

export const FormSection = ({
  title,
  course_id,
  section,
  onSubmit,
  button,
}: {
  title: string;
  course_id: string,
  section?: Section;
  onSubmit: ({ section }: { section: Section }) => void;
  button: string;
}) => {
  const [newTitle, setNewTitle] = useState(section?.title || '');
  const [newDescription, setNewDescription] = useState(section?.description || null);
  const [newDisplayOrder, setNewDisplayOrder] = useState(String(section?.display_order || 1));

  const handleSubmit = () => {
    const newSection: Section = {
      id: section?.id ?? '',
      title: newTitle,
      course_id: course_id,
      description: newDescription,
      thumbnail_url: section?.thumbnail_url || null,
      background_url: section?.background_url || null,
      display_order: Number(newDisplayOrder),
      is_unlocked: true


    };

    onSubmit({ section: newSection });
  };

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <header className="flex flex-col w-full">
        <h2 className="text-center">{title}</h2>
      </header>

      <main className="flex flex-col gap-2 w-full">
        <Input placeholder='Título' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />

        <Textarea placeholder='Descripción' value={newDescription ?? ''} onChange={(e) => setNewDescription(e.target.value)} />
        <Input placeholder='Posición' value={newDisplayOrder} onChange={(e) => setNewDisplayOrder(e.target.value)} />
      </main>

      <footer className="flex">
        <Button type="submit" className="w-full">
          {button}
        </Button>
      </footer>
    </Form>
  );
};
