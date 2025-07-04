import { Screen } from '../components/screen';
import { Navbar, NavbarProps } from '../layouts/navbar';

export interface GalleryTemplateProps {
  navbar: NavbarProps;
  src?: string | null;
}

export const CinemaTemplate = ({ navbar, src }: GalleryTemplateProps) => {
  return (
    <Screen className="flex flex-col">
      <Navbar {...navbar} />
      <iframe src={src ?? ''} className="h-full w-full" />
    </Screen>
  );
};
