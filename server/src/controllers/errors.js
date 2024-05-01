export const badRequestErr = {
  log: 'Bad request ',
  status: 400,
  message: { err: 'Bad inputs, please provide a username and a password' },
};

export const usernameConflictErr = {
  log: 'Username taken',
  status: 409,
  message: { err: 'This username already exists please choose another' },
};

export const createUserErr = {
  log: 'Error creating new user',
  status: 500,
  message: { err: 'Error creating new user' },
};
