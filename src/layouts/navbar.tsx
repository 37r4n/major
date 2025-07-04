import React from 'react';
import { User } from '../models/user';
import { Image } from '../components/image';
import { assets } from '../assets';
import { Divider } from '../components/divider';
import { Card } from '../components/card';
import { Avatar } from '../components/avatar';

export interface NavbarProps {
  user: User;
  links: {
    title: string;
    is_active?: boolean;
    onClick?: () => void;
  }[];

  actions?: {
    content: React.ReactNode;
    onClick?: () => void;
  }[];
}

export const Navbar = ({ user, links = [], actions = [] }: NavbarProps) => {
  return (
    <nav className="flex h-[50px] bg-foreground-50/50 w-vw]">
      <Card className="flex h-full w-full rounded-none">
        <div className="flex h-full w-full px-4">
          <div className="gap-4 w-[20%]">
            <Image src={assets.logo} className="h-full" />
          </div>

          <div className="flex gap-2 justify-center items-center flex-1 h-full py-4">
            <Divider orientation="vertical" />

            {links.map((link, index) => (
              <div
                key={index}
                onClick={link.onClick}
                className="flex flex-row gap-2 h-full justify-center items-center"
              >
                <div className="cursor-pointer">
                  <p>{link.title}</p>
                  <div className={`${link.is_active && 'bg-success'} h-[2px]`}></div>
                </div>
                <Divider orientation="vertical" />
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center gap-4 w-[20%]">
            <div className="flex gap-2 cursor-pointer">
              {actions.map((action, index) => (
                <div key={index} onClick={action.onClick}>
                  {action.content}
                </div>
              ))}
            </div>

            <Avatar src={user.avatar_url ?? ''} />
          </div>
        </div>
      </Card>
    </nav>
  );
};
