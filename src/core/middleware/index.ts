import { HelperI18Next } from '../universal-helper';
import { MiddlewareAuthInit } from './auth';

export const MiddlewareInit = async ({
  i18nList = [],
}: {
  i18nList: HelperI18Next.TypeI18NDomain[];
}) => {
  // console.log('Middleware Init');
  const storageUser = JSON.parse(localStorage.getItem('storage-user') || '{}');
  const langData = storageUser?.state?.langData;

  HelperI18Next.MiddlewareI18nInit(
    {
      debug: import.meta.env.VITE_DEBUG_MIDDLEWARE_I18NEXT == 'true',
      fallbackLng: langData?.lang || 'en',
    },
    i18nList,
  );

  await MiddlewareAuthInit();
};
