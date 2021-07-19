import config from 'config';
import jwt from 'jsonwebtoken';

const privateKey = config.get<string>('privateKey');

export const sign = (
  object: object | string,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, privateKey, options);
};

export const decode = (token: string) => {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
};
