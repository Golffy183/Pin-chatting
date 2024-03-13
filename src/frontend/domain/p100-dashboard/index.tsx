// import './index.scss';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { HelperI18Next } from '../../../core/universal-helper';
import { GetMethodStoreGlobal } from '../../global/store';
import UIMock from './component/ui-mock';
import initI18N from './i18n';

const sI18nDomainName = 'dashboard';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const JSX = () => {
  const { setMenu, setI18NDomainName, setMenuUIIsShow } = GetMethodStoreGlobal();
  const { t } = useTranslation([sI18nDomainName]);

  useEffect(() => {
    setI18NDomainName(sI18nDomainName);
    setMenuUIIsShow(true, true, true);
    setMenu(t('header'), t('footer'), 1);
  }, []);

  return (
    <>
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
        <UIMock data={{}} sI18nDomainName={sI18nDomainName} />
      </div>
    </>
  );
};

export default { I18N, JSX };
