import { SideNavContextProvider } from '@/context/SideNavContext';
import { FC, HTMLProps, memo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import PageLayout from './PageLayout';
import SideNav from './Sidenav';

const DashboardLayout: FC<HTMLProps<HTMLDivElement>> = memo(() => (
  <SideNavContextProvider>
    <PageLayout>
      <Header />
      <SideNav />
      <Outlet />
    </PageLayout>
  </SideNavContextProvider>
));

DashboardLayout.displayName = 'DashboardLayout';

export default DashboardLayout;
