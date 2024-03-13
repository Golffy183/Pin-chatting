import {
  Decrypted,
  Encrypted,
} from '../../../frontend/global/component/atoms/encrypt-decrypt';

export default function EnvConverter(obj: any, type?: boolean | false) {
  if (obj) {
    const objEn: any = {};
    for (const key in obj) {
      objEn[key] = type ? Decrypted(obj[key]) : Encrypted(obj[key]);
    }
    return objEn;
  }
  return;
}
