const loginSemPassword = {
  email: 'test@@test.com'
};

const loginWithEmailInvalid = {
  email: 'test.com',
  password: '1234567'
};

const loginWithPasswordInvalid = {
  email: 'test@test.com',
  password: '123'
};

const emailInexistInDB = {
  email: 'inexiste@test.com',
  password: '1234567'
}

const loginSemEmail ={
  password: '1234567'
}

const user = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'abcdefg'
}

const jwtPayload = {
  email: 'admin@admin.com',
  role: 'user'
}

export {
  loginSemPassword,
  loginWithEmailInvalid,
  loginWithPasswordInvalid,
  emailInexistInDB,
  loginSemEmail,
  user,
  jwtPayload
}
