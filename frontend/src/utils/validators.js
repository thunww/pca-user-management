export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least 1 uppercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least 1 number";
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value.trim()) return `${fieldName} is required`;
  return null;
};

export const validateSignUpForm = (form) => {
  const errors = {};

  const firstNameErr = validateRequired(form.firstName, "First name");
  if (firstNameErr) errors.firstName = firstNameErr;

  const lastNameErr = validateRequired(form.lastName, "Last name");
  if (lastNameErr) errors.lastName = lastNameErr;

  const emailErr = validateEmail(form.email);
  if (emailErr) errors.email = emailErr;

  const passwordErr = validatePassword(form.password);
  if (passwordErr) errors.password = passwordErr;

  const confirmErr = validateConfirmPassword(
    form.password,
    form.confirmPassword,
  );
  if (confirmErr) errors.confirmPassword = confirmErr;

  return errors;
};
