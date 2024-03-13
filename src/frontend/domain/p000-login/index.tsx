import './index.scss';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RiEyeLine, RiEyeOffLine, RiLockLine, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { MiddlewareAuth } from '../../../core/middleware/auth';
import { HelperI18Next, HelperTime } from '../../../core/universal-helper';
import EnvConverter from '../../../core/universal-helper/env-converter';
import { GetMethodStoreGlobal } from '../../global/store';
import { GetMethodStoreGlobalPersist } from '../../global/store/persist';
import initI18N from './i18n';

const sI18nDomainName = 'login';
const I18N: HelperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const schema = yup.object({
  username: yup.string().required('validate.required'),
  password: yup
    .string()
    .required('validate.required')
    .min(4, { key: 'validate.min', option: { count: 4 } }),
});

const JSX = () => {
  const { t, i18n } = useTranslation([sI18nDomainName]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const { setIsLoading, setUserData } = GetMethodStoreGlobal();
  const { setLangData } = GetMethodStoreGlobalPersist();

  const navigate = useNavigate();

  const changeFont = (font: string) => {
    const container = document.getElementById('main-container');
    container?.classList.forEach((className) => {
      if (className.startsWith('font-')) {
        container?.classList.remove(className);
      }
    });
    container?.classList.add(`font-${font}`);
  };

  // useEffect(() => {
  //   console.log(
  //     EnvConverter({
  //       API_KEY: 'http://localhost:8081',
  //     }),
  //   );
  // }, []);

  const loginWithUsernameAndPassword = async (sUsername: string, sPassword: string) => {
    setIsLoading(true);
    const res = await MiddlewareAuth.GetAuthCodeWithUsernameAndPassword({
      username: sUsername,
      password: sPassword,
    });
    await HelperTime.WaitForMilliSecond(800);
    setIsLoading(false);
    if (res?.response?.status === 401) {
      setError('username', {
        type: 'custom',
        message: 'validate.userNotFound',
      });

      return;
    }

    if (res?.statusCode !== 200) {
      setError('root', {
        type: 'custom',
        message: 'validate.networkRequestFailed',
      });
      return;
    }

    setUserData(res.token);
    navigate('/user/dashboard');
  };

  const onSubmit = async (data: any) => {
    await loginWithUsernameAndPassword(data.username, data.password);
  };

  const [isShowPassword, setIsShowPassword] = useState(false);
  const onClickShowPassword = () => {
    setIsShowPassword((state) => !state);
  };

  return (
    <div className="uh-h-screen login-page">
      <div className="login-container">
        <div className="text-center text-5xl mb-6 font-medium text-gray-500">
          Boilerplate
        </div>
        <div className="select-language">
          <div>
            <input
              className="mx-1 cursor-pointer"
              type="radio"
              name="EN"
              value="en"
              checked={i18n.language === 'en'}
              onChange={() => {
                i18n.changeLanguage('en');
                changeFont('SRB');
                setLangData({ lang: 'en', font: 'SRB' });
              }}
            />
            EN
          </div>
          <div>
            <input
              className="mx-1 cursor-pointer"
              type="radio"
              name="TH"
              value="th"
              checked={i18n.language === 'th'}
              onChange={() => {
                i18n.changeLanguage('th');
                changeFont('SRB');
                setLangData({ lang: 'th', font: 'SRB' });
              }}
            />
            TH
          </div>
        </div>

        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto max-w-lg flex-none ">
            <div
              className={
                'border-style shadow-md ' +
                (errors.username || errors.root ? ' error-style' : '')
              }
            >
              <div className="input-container">
                <div className="my-auto w-10 flex-none">
                  <RiUserLine color="DimGray" size="1.2em" className="m-auto block" />
                </div>
                <input
                  {...register('username')}
                  placeholder={t('form.username.placeholder') || ''}
                  type="text"
                  className="input-form"
                />
              </div>
            </div>
            {errors.username && (
              <div className="input-error">
                {HelperI18Next.MappingObject(errors.username.message, t)}
              </div>
            )}
            <div
              className={
                'border-style shadow-md ' +
                (errors.password || errors.root ? ' error-style' : '')
              }
            >
              <div className="input-container">
                <div className="my-auto w-10 flex-none">
                  <RiLockLine color="DimGray" size="1.2em" className="m-auto block" />
                </div>
                <input
                  placeholder={t('form.password.placeholder') || ''}
                  {...register('password')}
                  type={isShowPassword ? 'text' : 'password'}
                  /* block py-2 */
                  className="input-form"
                />
                <div
                  className="my-auto button-show-password"
                  onClick={onClickShowPassword}
                >
                  {isShowPassword && (
                    <RiEyeOffLine color="DimGray" size="1.2em" className="m-auto block" />
                  )}
                  {!isShowPassword && (
                    <RiEyeLine color="DimGray" size="1.2em" className="m-auto block" />
                  )}
                </div>
              </div>
            </div>
            {errors.password && (
              <div className="input-error">
                {HelperI18Next.MappingObject(errors.password.message, t)}
              </div>
            )}
            {errors.root && (
              <div className="input-error">
                {HelperI18Next.MappingObject(errors.root.message, t)}
              </div>
            )}
            <button
              disabled={!isDirty || !isValid}
              type="submit"
              className="button-form px-4 py-3"
            >
              {t('form.login')}
            </button>
          </div>
        </form>
        <form
          className="flex justify-center items-center flex-col mt-6"
          onSubmit={(event) => {
            event.preventDefault();

            const input = (event.target as HTMLFormElement)
              .elements[0] as HTMLInputElement;
            const color = input.value;
            const button = document.querySelector('.button-color') as HTMLElement;
            button.style.backgroundColor = color;
          }}
        >
          <input type="text" placeholder="#eb4034" className="input-form" />
          <button type="submit" className="button-color px-4 py-3">
            {t('form.color')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default { I18N, JSX };
