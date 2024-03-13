import { persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

import { HelperZustand } from '../../../../core/universal-helper';

// ============ Store ==============
export type TypeStoreGlobalPersist = {
  langData: {
    lang: string;
    font: string;
  };
};

// cant use method
export const StoreGlobalPersist = createWithEqualityFn(
  persist(
    (): TypeStoreGlobalPersist => ({
      langData: {
        lang: 'en',
        font: 'SRB',
      },
    }),
    {
      name: 'storage-user',
    },
  ),
);

// ============ Method ==============

export type TypeMethodStoreGlobalPersist = {
  setLangData: (langData: { lang: string; font: string }) => void;
};

const methodStoreGlobalPersist: TypeMethodStoreGlobalPersist = {
  setLangData: (langData: { lang: string; font: string }) => {
    StoreGlobalPersist.setState({ langData });
  },
};

// ============ Export ==============

export const UseStoreGlobalPersist = (
  stateList: string[],
  isShallow?: boolean,
): TypeStoreGlobalPersist => {
  return HelperZustand.StateMapping(
    stateList,
    StoreGlobalPersist,
    isShallow,
  ) as TypeStoreGlobalPersist;
};

export const GetMethodStoreGlobalPersist = (): TypeMethodStoreGlobalPersist => {
  return methodStoreGlobalPersist;
};

export const GetStoreGlobalPersist = () => StoreGlobalPersist.getState();
export const SetGlobalStorePersist = (prop: any) => StoreGlobalPersist.setState(prop);
