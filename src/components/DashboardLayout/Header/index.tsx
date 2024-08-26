import type { FC } from 'react';
import { useCallback, useContext, useTransition } from 'react';

import Bar from '@/components/common/Bar';
import { Button } from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Popover from '@/components/common/Popover';
import { SideNavContext } from '@/context/SideNavContext';
import { findNavLinkBySlug } from '@/utils/checkHeaderTitle';

import Typography from '@/components/common/Typography';
import { navLinks } from '@/constants/globalNavItems';
import { useAuth } from '@/context/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const { isExpanded, setIsExpanded } = useContext(SideNavContext);
  const { logout, profileInfo } = useAuth();
  const [, startTransition] = useTransition();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const HeadTitle = findNavLinkBySlug(navLinks, pathname);

  const handleMenuClick = useCallback(() => setIsExpanded?.((prev) => !prev), [setIsExpanded]);

  const handleLogout = async () => {
    await logout?.();
    startTransition(() => navigate('/login'));
  };

  return (
    <header
      id="click-outside-dropdown"
      className="bg-white shadow grid-area/header relative z-20 flex min-h-[4rem] items-center justify-between px-4"
    >
      <Button size="S" variant="outline" edges="square" className="-l-2 relative mr-3 h-8 w-8 justify-center lg:hidden" onClick={handleMenuClick}>
        <div className="relative">
          <span className="sr-only">Open main menu</span>
          <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
            <Bar className={isExpanded ? 'rotate-45' : '-translate-y-1.5'} />
            <Bar className={isExpanded ? 'opacity-0' : ''} />
            <Bar className={isExpanded ? '-rotate-45' : 'translate-y-1.5'} />
          </div>
        </div>
      </Button>

      <div className="flex-grow">
        <Typography variant="body2" weight="semibold">
          {HeadTitle?.title}
        </Typography>
      </div>
      <div className="flex items-start space-x-4">
        <Popover interactionType="click">
          <div className="flex items-center gap-2 hover:cursor-pointer">
            <Icon iconName="account_circle" className="text-gray-700" />
            <Typography variant="body2" weight="semibold" typoColor="grey" className="inline-block whitespace-nowrap capitalize tracking-wide">
              {profileInfo?.fullName ?? 'User'}
            </Typography>
          </div>
          <Popover.Popup placement="bottom-start" className="shadow w-40 p-3">
            <Link to="/change-password" className="flex w-full items-center gap-2 pb-2 hover:cursor-pointer ">
              <Icon iconName="account_circle" className="text-grey-700" />
              <Typography variant="body3" weight="semibold" typoColor="grey" className=" inline-block capitalize tracking-wide">
                Change Password
              </Typography>
            </Link>
            <div onClick={handleLogout} className=" flex items-center gap-2 hover:cursor-pointer">
              <Icon iconName="logout" />
              <Typography variant="body3" weight="semibold" typoColor="grey" className="inline-block capitalize tracking-wide">
                Log Out
              </Typography>
            </div>
          </Popover.Popup>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
