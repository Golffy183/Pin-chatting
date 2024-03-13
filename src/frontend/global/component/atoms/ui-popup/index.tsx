import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HelperTime } from '../../../../../core/universal-helper';
import { GetMethodStoreGlobal } from '../../../store';

export const UIPopup = (props: {
  sI18nDomainName: string;
  content: JSX.Element;
  callback: (setAction: boolean) => void;
}) => {
  const { t } = useTranslation([props.sI18nDomainName]);
  const { setIsLoading } = GetMethodStoreGlobal();
  const [UIJSX, setUIJSX] = useState(
    <div className="relative z-50">
      <div className="uh-h-screen flex justify-center items-center py-auto absolute m-auto w-full bg-stone-900 bg-opacity-70 p-5">
        <div className="fade-in container -mt-36 h-auto rounded-4xl border-1 shadow-lg border-[#707070] bg-white p-3 pt-6">
          <div className="w-full flex-1 justify-center space-y-4 text-center">
            <div className="text-3xl font-bold">{t('popup.header')}</div>
            <props.content.type {...props.content.props} />
            <button
              onClick={async () => {
                setIsLoading(true);
                await HelperTime.WaitForMilliSecond(1000);
                props.callback(true);
                setUIJSX(<></>);
                setIsLoading(false);
              }}
              className="w-auto px-12 rounded-full bg-primary py-2 font-bold text-white hover:bg-primary-hover transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              {t('popup.button')}
            </button>
          </div>
        </div>
      </div>
    </div>,
  );

  return UIJSX;
};
