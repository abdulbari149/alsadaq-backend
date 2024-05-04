import bcrypt from 'bcrypt';

const hash = async (data: string) => {
  return await bcrypt.hash(data, 10);
};

const isMatch = async (raw: string, encrypted: string) => {
  return await bcrypt.compare(raw, encrypted);
};

export default {
  hash,
  isMatch,
};
