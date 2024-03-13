import './index.scss';
import './font.scss';

import React from 'react';

import { HelperI18Next } from '../../core/universal-helper';
import UILoader from './component/atoms/ui-loader';
import initI18N from './i18n';
import Route from './route';

const i18nList: HelperI18Next.TypeI18NDomain[] = [
  initI18N({ name: 'main' }),
  ...Route.i18nList,
];

const JSX: React.FC = () => {
  return (
    <div id="main-container" className="">
      <UILoader>
        <Route.JSX />
      </UILoader>
    </div>
  );
};

export default { i18nList, JSX: React.memo(JSX) };
