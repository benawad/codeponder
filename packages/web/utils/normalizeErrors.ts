interface Error {
  path: string;
  message: string;
}

interface ErrMap {
  [key: string]: string;
}

export const normalizeErrors = (errors: Error[]): ErrMap => {
  const errMap: ErrMap = {};

  errors.forEach(err => {
    errMap[err.path] = err.message;
  });

  return errMap;
};
