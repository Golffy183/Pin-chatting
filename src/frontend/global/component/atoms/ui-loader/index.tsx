import './index.scss';

import { ProgressBar } from 'react-loader-spinner';

import { UseStoreGlobal } from '../../../store';

const UILoader = (props: any) => {
  const { isLoading } = UseStoreGlobal(['isLoading']);
  if (isLoading) {
    return (
      <>
        {props.children}
        <div className="uh-h-screen BGLoaderOverlay flex items-center justify-center">
          <ProgressBar
            height="300"
            width="300"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="white"
            barColor="#1e71c9"
          />
        </div>
      </>
    );
  }

  return <>{props.children}</>;
};

export default UILoader;
