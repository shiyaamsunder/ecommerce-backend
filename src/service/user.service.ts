import { get, omit } from 'lodash';
import { DocumentDefinition } from 'mongoose';
import User, { UserDocument } from '../model/user.model';
import { FilterQuery } from 'mongodb';
import { decode, sign } from '../utils/jwt.utils';
import config from 'config';

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await User.create(input);
  } catch (err) {
    throw new Error(err);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: UserDocument['email'];
  password: string;
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
};

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return User.findOne(query).lean();
};

export const reIssueAccessToken = async (token: string) => {
  const { decoded } = decode(token);

  if (!decoded || !get(decoded, 'id')) return false;

  const id = get(decoded, 'id');

  const user = await findUser({ _id: id });

  if (!user) return false;

  const accessToken = sign(
    { id: user._id },
    {
      expiresIn: config.get('accessTokenTtl'),
    }
  );

  return accessToken;
};
