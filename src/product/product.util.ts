import ShortUniqueId from 'short-unique-id';

export const generateShortId = new ShortUniqueId({
  length: 6,
  debug: process.env.NODE_ENV === 'development',
  dictionary: 'alphanum_upper',
});
