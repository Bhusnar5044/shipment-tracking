/* eslint-disable @typescript-eslint/no-explicit-any */
export type RoutesProps = {
    name: string;
    title: string;
    component: React.ReactNode;
    path: string;
    isPublic?: boolean;
}
export type RouteConfig = {
    layout: React.ReactNode;
    routes: RoutesProps[];
};