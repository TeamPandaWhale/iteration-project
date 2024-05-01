export const validateUserInfo = (username, password) => {
  if (typeof username !== 'string' && typeof password !== 'string') {
    return false;
  }
  if (username.length === 0 || password.length === 0) return false;
  return true;
};
