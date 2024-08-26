import { FC, HTMLProps, memo } from "react";
import PageLayout from "./PageLayout";
import Header from "./Header";
import SideNav from "./Sidenav";
import { Outlet } from 'react-router-dom';
import { SideNavContextProvider } from "@/context/SideNavContext";


const DashboardLayout: FC<HTMLProps<HTMLDivElement>> = memo(() => (
    <SideNavContextProvider>
    <PageLayout>
        <Header />
        <SideNav />
        <Outlet />
    </PageLayout>
    </SideNavContextProvider>
));

DashboardLayout.displayName = "DashboardLayout";

export default DashboardLayout;