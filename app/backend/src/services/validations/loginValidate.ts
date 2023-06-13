import ValidationResult from '../../Interfaces/IValidationResult';

export const validateFieldsLogin = (
  email: string,
  password: string,
): ValidationResult | undefined => {
  if (!email || !password) {
    return { status: 400, message: 'All fields must be filled' };
  }

  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;
  if (!emailRegex.test(email) || password.length < 6) {
    return { status: 401, message: 'Invalid email or password' };
  }

  return undefined;
};

const validate = { validateFieldsLogin };

export default validate;
