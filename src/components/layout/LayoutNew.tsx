import { ReactNode } from 'react';
import { SidebarNew, NavSection } from './SidebarNew';

interface LayoutNewProps {
  children: ReactNode;
  navigation: NavSection[];
}

export const LayoutNew = ({ children, navigation }: LayoutNewProps) => {
  return (
    <div className="flex h-screen bg-white">
      <SidebarNew sections={navigation} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1400px] p-8">{children}</div>
      </main>
    </div>
  );
};
