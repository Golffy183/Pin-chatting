import 'virtual:windi.css';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Main from '../frontend/global';
import { FixbugInit } from './fixbug';
import { MiddlewareInit } from './middleware';

const isStrictMode = import.meta.env.VITE_DEBUG_IS_STRICT_MODE == 'true';

const StrictMode = (props: { children: React.ReactNode }) => {
  if (isStrictMode) {
    console.log('Strict Mode');
    return <React.StrictMode>{props.children}</React.StrictMode>;
  }

  return <>{props.children}</>;
};

(async () => {
  FixbugInit();
  await MiddlewareInit({ i18nList: Main.i18nList });
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <Main.JSX />
    </StrictMode>,
  );
})();
