import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import TemplateMobile from '../../templates/template-mobile';
import TemplateWebsite from '../../templates/template-website';

export const TemplateMode = () => {
  const [isMobile, setIsMobile] = useState(CheckDeviceIsMobile());

  const handleResize = useCallback(() => {
    setIsMobile(CheckDeviceIsMobile());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return isMobile ? (
    <TemplateMobile>
      <Outlet />
    </TemplateMobile>
  ) : (
    <TemplateWebsite>
      <Outlet />
    </TemplateWebsite>
  );
};

const CheckDeviceIsMobile = () => {
  const isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  return isAndroid || isIOS;
};
