import Dayjs from 'dayjs';

export const WaitForMilliSecond = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};

export const IsJsonFirestoreTimeStamp = (object: any) => {
  return 'seconds' in object && 'nanoseconds' in object;
};

export const ConvertJsonFirestoreTimeStampToDate = ({
  seconds,
  nanoseconds,
}: {
  seconds: number;
  nanoseconds: number;
}) => {
  return new Date(seconds * 1000 + nanoseconds / 1000000);
};
