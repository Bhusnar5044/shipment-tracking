import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Meta from './Meta';

const Layout = () => {
  return (
    <>
      <Meta />
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="max-w-screen-xl mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
