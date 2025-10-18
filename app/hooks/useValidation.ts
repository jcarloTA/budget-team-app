import { useState, useCallback } from 'react';
import { Validator } from '../utils/validation';

export interface UseValidationOptions {
  validator: Validator;
  initialData?: { [key: string]: any };
  validateOnChange?: boolean;
}

export interface UseValidationReturn {
  errors: { [key: string]: string };
  isValid: boolean;
  validateField: (field: string, value: any) => void;
  validateAll: (data: { [key: string]: any }) => boolean;
  clearErrors: () => void;
  clearFieldError: (field: string) => void;
  hasError: (field: string) => boolean;
  getFieldError: (field: string) => string | null;
}

export const useValidation = (options: UseValidationOptions): UseValidationReturn => {
  const { validator, initialData = {}, validateOnChange = true } = options;
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = useCallback((field: string, value: any) => {
    if (!validateOnChange) return;
    
    const error = validator.validateField(field, value);
    setErrors(prev => {
      if (error) {
        return { ...prev, [field]: error };
      } else {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
    });
  }, [validator, validateOnChange]);

  const validateAll = useCallback((data: { [key: string]: any }): boolean => {
    const result = validator.validate(data);
    setErrors(result.errors);
    return result.isValid;
  }, [validator]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const hasError = useCallback((field: string): boolean => {
    return !!errors[field];
  }, [errors]);

  const getFieldError = useCallback((field: string): string | null => {
    return errors[field] || null;
  }, [errors]);

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
    validateField,
    validateAll,
    clearErrors,
    clearFieldError,
    hasError,
    getFieldError
  };
};
