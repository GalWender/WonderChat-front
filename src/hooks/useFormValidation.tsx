import { useState } from "react";

export interface ValidationErrors {
  email: string | null;
  password: string | null;
}

export const useValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({
    email: null,
    password: null,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // You can add more password validation logic here (e.g., minimum length, special characters).
    return password.length >= 8;
  };

  const validateForm = (formData: { email: string; password: string }): boolean => {
    const { email, password } = formData;
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    setErrors({
      email: emailValid ? null : "Invalid email address",
      password: passwordValid ? null : "Password must be at least 8 characters long",
    });

    return emailValid && passwordValid;
  };

  return { errors, validateForm };
};