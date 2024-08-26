import { navLinks } from '@/constants/globalNavItems';
import { SideNavContext } from '@/context/SideNavContext';
import { cn } from '@/utils';
import { getRoleAndPermissions } from '@/utils/getRoleAndPermissions';
import type { FC } from 'react';
import { useContext } from 'react';

import { NavListItem } from './NavListItem';
import SideNavHeader from './SidenavHeader';

const SideNav: FC = () => {
  const { isExpanded, setIsExpanded } = useContext(SideNavContext);
  const { userRole } = getRoleAndPermissions();
  return (
    <aside
      className={cn(
        `bg-white shadow lg:grid-area/aside absolute top-16 z-20 h-screen transition-[0.2s] duration-200 ease-[ease-out] lg:relative lg:left-0 lg:top-0`,
        isExpanded ? 'w-[14rem]' : '-left-[14rem] lg:w-[6.5rem]'
      )}
    >
      <nav
        className={`bg-white relative box-border flex h-full flex-col transition-all duration-200 ease-[ease-out] ${
          isExpanded ? 'shadow-[0.2rem_0_1.6rem_#B0BCC8]' : ''
        }`}
      >
        <SideNavHeader isHovered={isExpanded} title="" />
        <ul className="no-scrollbar m-0 flex h-[calc(100vh-5rem)] list-none flex-col  gap-4 overflow-y-auto overflow-x-hidden pt-8">
          {navLinks.map((navItem) => {
            return <NavListItem key={navItem.name} {...{ navItem, isExpanded, setIsExpanded, userRole }} />;
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
