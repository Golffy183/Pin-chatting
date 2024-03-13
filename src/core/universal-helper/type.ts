export type TypeGolangResponse = { res: any; error: Error | null };

export const ReturnInterfacePromise = (res: any): Promise<any> => {
  return Promise.resolve(res);
};

// confirm return with data
export type TypeAPIData = {
  data: any;
} & Record<string, any>;

export type TypeAPIDataGolangResponse = {
  res: TypeAPIData | null;
  error: Error | null;
};

// draft
export type TypePaginationResponse = {
  query: {
    limit: number;
    offset: number;
    page: number;
    size: number;
  };
  item: {
    from: number;
    to: number;
    total: number;
  };
  page: {
    current: number;
    last: number;
    size: number;
    url: {
      previous: string | null;
      next: string | null;
      first: string | null;
      last: string | null;
      templage: string | null;
    };
  };
};
