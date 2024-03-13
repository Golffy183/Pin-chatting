import i18n from 'i18next';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { MiddlewareAuth } from '../../../core/middleware/auth';
import { HelperI18Next } from '../../../core/universal-helper';
import P000Login from '../../domain/p000-login';
import P100Dashboard from '../../domain/p100-dashboard';
import P400Blank from '../../domain/p400-blank';
import P500Menu from '../../domain/p500-menu';
import RoutePrivate from '../component/atoms/route-private';
import { TemplateMode } from '../component/atoms/template-mode';
import { GetMethodStoreGlobal, UseStoreGlobal } from '../store';
import { GetMethodStoreGlobalPersist, UseStoreGlobalPersist } from '../store/persist';

const i18nList: HelperI18Next.TypeI18NDomain[] = [
  P000Login.I18N,
  P100Dashboard.I18N,
  P400Blank.I18N,
  P500Menu.I18N,
];

const JSX = (props: any) => {
  const { langData } = UseStoreGlobalPersist(['langData']);
  const { userData } = UseStoreGlobal(['userData']);
  const { setLangData } = GetMethodStoreGlobalPersist();
  const { setUserData, setIsLoading } = GetMethodStoreGlobal();

  const setLanguageAndFont = (langData: { lang: string; font: string }) => {
    i18n.changeLanguage(langData.lang);
    const mainContainer = document.getElementById('main-container');
    updateFontClass(mainContainer, `font-${langData.font}`);
  };

  const updateFontClass = (element: HTMLElement | null, newClass: string) => {
    element?.className.split(' ').forEach((className) => {
      if (className.includes('font-')) {
        element?.classList.remove(className);
      }
    });

    element?.classList.add(newClass);
  };

  useEffect(() => {
    const jsonLangStorage = langData;

    if (!jsonLangStorage) {
      const defaultLangData = { lang: 'en', font: 'SRB' };
      setLangData(defaultLangData);
      return;
    }

    setLanguageAndFont(jsonLangStorage);
  }, []);

  const deleteAuthTokenCookie = () => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const checkAuthToken = async () => {
    setIsLoading(true);
    const { status, token } = await MiddlewareAuth.GetAuthCodeWithToken();
    setIsLoading(false);
    if (status === 200) {
      MiddlewareAuth.SetCookie({ cookieName: 'token', cookieValue: token, exDays: 1 });
      setUserData(token);
    } else {
      deleteAuthTokenCookie();
      setUserData(null);
    }
  };

  useEffect(() => {
    if (MiddlewareAuth.GetCookie('token')) {
      checkAuthToken();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={userData ? <Navigate replace to="/user" /> : <P000Login.JSX />}
        />
        {/* <Route path="/" element={<p000Login.JSX />} /> */}
        <Route
          path="user"
          element={
            <RoutePrivate isAuth={userData}>
              <TemplateMode />
            </RoutePrivate>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<P100Dashboard.JSX />} />
          <Route path="blank" element={<P400Blank.JSX />} />
          <Route path="menu" element={<P500Menu.JSX />} />
        </Route>
        <Route path="*" element={<div>URLs Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default { i18nList, JSX };
