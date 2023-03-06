import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  buttonLogin: { id: 'auth.button.login', defaultMessage: 'Sign in' },
  buttonRegister: { id: 'auth.button.register', defaultMessage: 'Sign up' },
  formHeading: {
    id: 'auth.form.heading.registration',
    defaultMessage: 'Sign up',
  },
  labelEmail: { id: 'auth.form.label.email', defaultMessage: 'Email' },
  labelFirstName: {
    id: 'auth.form.label.first-name',
    defaultMessage: 'First name',
  },
  labelLogin: { id: 'auth.form.label.login', defaultMessage: 'Login' },
  labelPassword: { id: 'auth.form.label.password', defaultMessage: 'Password' },
  labelPhone: { id: 'auth.form.label.phone', defaultMessage: 'Phone' },
  labelSecondName: {
    id: 'auth.form.label.second-name',
    defaultMessage: 'Second name',
  },
  placeholderEmail: {
    id: 'auth.form.placeholder.email',
    defaultMessage: 'Email',
  },
  placeholderFirstName: {
    id: 'auth.form.placeholder.first-name',
    defaultMessage: 'First name',
  },
  placeholderLogin: {
    id: 'auth.form.placeholder.login',
    defaultMessage: 'Login ',
  },
  placeholderPassword: {
    id: 'auth.form.placeholder.password',
    defaultMessage: 'Password',
  },
  placeholderPhone: {
    id: 'auth.form.placeholder.phone',
    defaultMessage: 'Phone',
  },
  placeholderSecondName: {
    id: 'auth.form.placeholder.second-name',
    defaultMessage: 'Second name',
  },
  textAlreadyHaveAccount: {
    id: 'auth.question.already-have-account',
    defaultMessage: 'Already have account?',
  },
  validationEmailInvalidFormat: {
    id: 'validation.invalid-format.email',
    defaultMessage: 'Email must be of "email@example.com" format',
  },
  validationEmailMaxLength: {
    id: 'validation.max-length.email',
    defaultMessage: 'Email cannot be longer than 30 characters',
  },
  validationEmailMinLength: {
    id: 'validation.min-length.email',
    defaultMessage: 'Email must be at least 5 characters',
  },
  validationFirstNameMaxLength: {
    id: 'validation.max-length.first-name',
    defaultMessage: 'First name cannot be longer than 30 characters',
  },
  validationFirstNameMinLength: {
    id: 'validation.min-length.first-name',
    defaultMessage: 'First name must be at least 1 character',
  },
  validationPasswordMaxLength: {
    id: 'validation.max-length.password',
    defaultMessage: 'Password cannot be longer than 40 characters',
  },
  validationLoginMinLength: {
    id: 'validation.min-length.login',
    defaultMessage: 'Login must be at least 4 characters',
  },
  validationLoginMaxLength: {
    id: 'validation.max-length.login',
    defaultMessage: 'Login cannot be longer than 20 characters',
  },
  validationPasswordMinLength: {
    id: 'validation.min-length.password',
    defaultMessage: 'Password must be at least 4 characters',
  },
  validationPhoneInvalidFormat: {
    id: 'validation.invalid-format.phone',
    defaultMessage: 'Phone can only contain 10-15 digits, can start with +',
  },
  validationPhoneMaxLength: {
    id: 'validation.max-length.phone',
    defaultMessage: 'Phone cannot be longer than 15 characters',
  },
  validationPhoneMinLength: {
    id: 'validation.min-length.phone',
    defaultMessage: 'Phone must be at least 10 characters',
  },
  validationSecondNameMaxLength: {
    id: 'validation.max-length.second-name',
    defaultMessage: 'Second name cannot be longer than 30 characters',
  },
  validationSecondNameMinLength: {
    id: 'validation.min-length.second-name',
    defaultMessage: 'Second name must be at least 1 characters',
  },
  validationRequiredField: {
    id: 'validation.required-field',
    defaultMessage: 'This field is required',
  },
});
