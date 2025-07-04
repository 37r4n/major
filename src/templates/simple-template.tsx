import { Button } from '../components/button';
import { Card } from '../components/card';
import { Image } from '../components/image';
import { Screen } from '../components/screen';

export interface SimpleTemplateProps {
  src?: string;
  title?: string;
  description?: string;
  button?: string;
  onClick?: () => void;
}

export const SimpleTemplate = ({ src, title, description, button, onClick }: SimpleTemplateProps) => {
  return (
    <Screen className="flex justify-center items-center">
      <Image src={src} className="h-full fade-bottom" />

      <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-end items-center p-2 gap-2">
        <Card className="p-2">
          <h2>{title}</h2>
        </Card>

        <Card className="p-2">
          <p>{description}</p>
        </Card>

        <Button onClick={onClick}>{button}</Button>
      </div>
    </Screen>
  );
};
