export const emailValidator = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u.test(
    email
  );

export const passwordStrengthValidator = (password) =>
  /^(?=(.*[a-z]){2,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,}).{6,}$/g.test(password);

export const birthdayValidator = (birthday) =>
  /^(?:0[1-9]|[12]\d|3[01])([/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/g.test(
    birthday
  );

export const сyrillicValidator = (value) => /^[а-яё ]+$/giu.test(value);

export const phoneNumberValidator = (phone) =>
  /^(\+7|7|8)?(9){1}?[\d]{9}$/g.test(phone);
