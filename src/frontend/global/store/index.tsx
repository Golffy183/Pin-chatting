import { createWithEqualityFn } from 'zustand/traditional';

import { HelperZustand } from '../../../core/universal-helper';

export type TypeStoreGlobal = {
  userData: any;
  isLoading: boolean;
  sI18NDomainName: string;
  menu: {
    sHeaderName: string;
    footer: string;
    iIconID: number;
  };
  menuUIIsShow: {
    isShowHeader: boolean;
    isShowI18n: boolean;
    isShowFooter: boolean;
  };
  count: number;
};

export const StoreGlobal = createWithEqualityFn(
  (): TypeStoreGlobal => ({
    userData: null,
    isLoading: false,
    sI18NDomainName: '',
    menu: {
      sHeaderName: '',
      footer: '',
      iIconID: 0,
    },
    menuUIIsShow: {
      isShowHeader: false,
      isShowI18n: false,
      isShowFooter: false,
    },
    count: 0,
  }),
);

// ============ Method ==============
export type TypeMethodStoreGlobal = {
  setUserData: (userData: any) => void;
  setIsLoading: (isLoading: boolean) => void;
  setMenu: (sHeaderName: string, footer: string, iIconID: number) => void;
  setI18NDomainName: (sI18NDomainName: string) => void;
  setCountIncrease: () => void;
  setCountDecrease: () => void;
  setMenuUIIsShow: (
    isShowHeader: boolean,
    isShowI18n: boolean,
    isShowFooter: boolean,
  ) => void;
};

const methodStoreGlobal: TypeMethodStoreGlobal = {
  setUserData: (userData: any) => {
    StoreGlobal.setState({ userData });
  },
  setIsLoading: (isLoading: boolean) => {
    StoreGlobal.setState({ isLoading });
  },
  setMenu: (sHeaderName: string, footer: string, iIconID: number) => {
    StoreGlobal.setState({ menu: { sHeaderName, footer, iIconID } });
  },
  setI18NDomainName: (sI18NDomainName: string) => {
    StoreGlobal.setState({ sI18NDomainName: sI18NDomainName });
  },
  setCountIncrease: () => {
    StoreGlobal.setState((state) => ({ count: state.count + 1 }));
  },
  setCountDecrease: () => {
    StoreGlobal.setState((state) => ({ count: state.count - 1 }));
  },
  setMenuUIIsShow: (
    isShowHeader: boolean,
    isShowI18n: boolean,
    isShowFooter: boolean,
  ) => {
    StoreGlobal.setState({
      menuUIIsShow: { isShowHeader, isShowI18n, isShowFooter },
    });
  },
};

// ============ Export ==============
export const UseStoreGlobal = (
  stateList: string[],
  isShallow?: boolean,
): TypeStoreGlobal => {
  return HelperZustand.StateMapping(stateList, StoreGlobal, isShallow) as TypeStoreGlobal;
};

export const GetMethodStoreGlobal = (): TypeMethodStoreGlobal => {
  return methodStoreGlobal;
};

export const GetStoreGlobal = () => StoreGlobal.getState();
export const SetStoreGlobal = (prop: any) => StoreGlobal.setState(prop);
