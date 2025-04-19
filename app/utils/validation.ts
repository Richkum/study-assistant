export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  // if (!/[A-Z]/.test(password)) {
  //   return "Password must contain at least one uppercase letter";
  // }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }
  return null;
};

export const validateFullName = (name: string): string | null => {
  if (!name) {
    return "Full name is required";
  }
  if (name.trim().length < 3) {
    // Changed from 2 to 3 characters minimum
    return "Full name must be at least 3 characters long";
  }
  if (!/^[a-zA-Z\s]*$/.test(name)) {
    return "Full name can only contain letters and spaces";
  }
  const nameParts = name.trim().split(" ");
  if (nameParts.length < 2) {
    return "Please enter both first and last name";
  }
  if (nameParts.some((part) => part.length < 2)) {
    return "Each name part must be at least 2 characters long";
  }
  return null;
};

export const validatePasswordsMatch = (
  password: string,
  confirmPassword: string
): string | null => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
};
