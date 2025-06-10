import { compare, hash } from 'bcrypt';

export const hashPassword = async password => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const isEqual = await compare(password, hashedPassword);
  return isEqual;
};
