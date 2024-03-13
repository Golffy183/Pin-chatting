// import './index.scss';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { HelperI18Next } from '../../../core/universal-helper';
import { GetMethodStoreGlobal } from '../../global/store';
import initI18N from './i18n';

const sI18nDomainName = 'menu';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow, setUserData } =
    GetMethodStoreGlobal();

  const { t } = useTranslation([sI18nDomainName]);

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, true, true);
    setMenu(t('header'), t('footer'), 5);
  }, []);

  const deleteAuthTokenCookie = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const handleLogout = () => {
    deleteAuthTokenCookie();
    setUserData(null);
  };

  return (
    <div className="bg-light-700 flex flex-auto flex-col">
      <div className="flex flex-auto flex-col"></div>
      <div className="h-15 mb-10 flex-none px-10">
        <button
          className="bg-secondary-select hover:bg-secondary-hover
            block w-full rounded 
             py-3 text-2xl  font-medium text-white shadow-xl
            disabled:bg-gray-500
            disabled:text-gray-300"
          onClick={() => {
            handleLogout();
          }}
        >
          {t('logout')}
        </button>
      </div>
    </div>
  );
};

export default { I18N, JSX };
