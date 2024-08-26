import Button from '@/components/common/Button';
import ThemeToggle from '@/components/theme-toggle';
import { useAuth } from '@/context/AuthProvider';
import { getRoleAndPermissions } from '@/utils/getRoleAndPermissions';
import { Link } from 'react-router-dom';

const Header = () => {
  const {logout} = useAuth()
  const { token} = getRoleAndPermissions();
  
  return (
    <header>
      <nav className="border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-800 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <a href="/" className="flex items-center">
            <img
              src="/assets/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
          </a>
          <div className="flex items-center lg:order-2">
            {!token ? (<Link
              to="/login"
              className='underline underline-offset-4 text-blue-500 hover:text-blue-800'
            >
              Log in / Register
            </Link>)
            : (
              <Button
              variant="flat"
              to="/login"
              onClick={logout}
            >
              Log out
            </Button>)}
            <ThemeToggle />
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
            id="mobile-menu-2"
          >
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
            {token && (<li>
                <Link
                  to="/dashboard"
                  className='underline underline-offset-4 text-blue-500 hover:text-blue-800'
                  >
                  Dashboard
                </Link>
              </li>)}
              <li>
              <Link
                  to="/contact"
                  className='underline underline-offset-4 text-blue-500 hover:text-blue-800'
                  >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
