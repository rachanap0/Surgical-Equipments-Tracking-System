'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();
  const [isAboutUsActive, setAboutUsActive] = useState(false);
  const [isDashboardActive, setDashboardActive] = useState(false);
  const [isOrdersActive, setOrdersActive] = useState(false);
  const [isInventoryActive, setInventoryActive] = useState(false);
  const [isProfileActive, setProfileActive] = useState(false);

  useEffect(() => {
    setAboutUsActive(false);
    setDashboardActive(false);
    setOrdersActive(false);
    setInventoryActive(false);
    setProfileActive(false);

    switch (pathname) {
      case '/':
        setAboutUsActive(true);
        break;
      case '/request-equipment':
        setDashboardActive(true);
        break;
      case '/orders':
        setOrdersActive(true);
        break;
      case '/inventory':
        setInventoryActive(true);
        break;
      case '/profile':
        setProfileActive(true);
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isAboutUsActive,
    isDashboardActive,
    isOrdersActive,
    isInventoryActive,
  };
};

export default useNavigation;