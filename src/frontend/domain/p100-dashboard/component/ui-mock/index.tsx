import { useTranslation } from 'react-i18next';

const UIMock = (props: { data: any; sI18nDomainName: string }) => {
  const { t } = useTranslation([props.sI18nDomainName]);
  return (
    <div
      className="text-2xl font-medium
              shadow-md
             bg-white rounded-xl
             pt-3 pb-1 block mt-4 mx-6 h-30
             flex flex-col cursor-pointer items-center justify-center"
    >
      {t('text')}
    </div>
  );
};

export default UIMock;
