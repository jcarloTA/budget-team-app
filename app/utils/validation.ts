// Utilidades de validación para formularios

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export class Validator {
  private rules: { [key: string]: ValidationRule } = {};

  addRule(field: string, rule: ValidationRule) {
    this.rules[field] = rule;
    return this;
  }

  validate(data: { [key: string]: any }): ValidationResult {
    const errors: { [key: string]: string } = {};

    for (const field in this.rules) {
      const rule = this.rules[field];
      const value = data[field];

      // Validación requerida
      if (rule.required && (!value || value.toString().trim() === '')) {
        errors[field] = 'Este campo es requerido';
        continue;
      }

      // Si el campo está vacío y no es requerido, saltar otras validaciones
      if (!value || value.toString().trim() === '') {
        continue;
      }

      // Validación de longitud mínima
      if (rule.minLength && value.toString().length < rule.minLength) {
        errors[field] = `Debe tener al menos ${rule.minLength} caracteres`;
        continue;
      }

      // Validación de longitud máxima
      if (rule.maxLength && value.toString().length > rule.maxLength) {
        errors[field] = `No puede exceder ${rule.maxLength} caracteres`;
        continue;
      }

      // Validación de valor mínimo (para números)
      if (rule.min !== undefined && Number(value) < rule.min) {
        errors[field] = `El valor mínimo es ${rule.min}`;
        continue;
      }

      // Validación de valor máximo (para números)
      if (rule.max !== undefined && Number(value) > rule.max) {
        errors[field] = `El valor máximo es ${rule.max}`;
        continue;
      }

      // Validación de patrón
      if (rule.pattern && !rule.pattern.test(value.toString())) {
        errors[field] = 'El formato no es válido';
        continue;
      }

      // Validación personalizada
      if (rule.custom) {
        const customError = rule.custom(value);
        if (customError) {
          errors[field] = customError;
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  validateField(field: string, value: any): string | null {
    const rule = this.rules[field];
    if (!rule) return null;

    // Validación requerida
    if (rule.required && (!value || value.toString().trim() === '')) {
      return 'Este campo es requerido';
    }

    // Si el campo está vacío y no es requerido, saltar otras validaciones
    if (!value || value.toString().trim() === '') {
      return null;
    }

    // Validación de longitud mínima
    if (rule.minLength && value.toString().length < rule.minLength) {
      return `Debe tener al menos ${rule.minLength} caracteres`;
    }

    // Validación de longitud máxima
    if (rule.maxLength && value.toString().length > rule.maxLength) {
      return `No puede exceder ${rule.maxLength} caracteres`;
    }

    // Validación de valor mínimo (para números)
    if (rule.min !== undefined && Number(value) < rule.min) {
      return `El valor mínimo es ${rule.min}`;
    }

    // Validación de valor máximo (para números)
    if (rule.max !== undefined && Number(value) > rule.max) {
      return `El valor máximo es ${rule.max}`;
    }

    // Validación de patrón
    if (rule.pattern && !rule.pattern.test(value.toString())) {
      return 'El formato no es válido';
    }

    // Validación personalizada
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }
}

// Validadores específicos para el dominio de la aplicación
export const createRequestValidator = new Validator()
  .addRule('reason', {
    required: true,
    minLength: 3,
    maxLength: 100
  })
  .addRule('description', {
    required: true,
    minLength: 10,
    maxLength: 500
  })
  .addRule('amount', {
    required: true,
    min: 0.01,
    max: 100000,
    custom: (value) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return 'Debe ser un número válido';
      }
      if (numValue <= 0) {
        return 'El monto debe ser mayor a 0';
      }
      return null;
    }
  });

export const loginValidator = new Validator()
  .addRule('email', {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value) => {
      if (!value.includes('@')) {
        return 'Debe ser un email válido';
      }
      return null;
    }
  })
  .addRule('password', {
    required: true,
    minLength: 6,
    maxLength: 50
  });

// Utilidades adicionales
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatAmount = (amount: string | number): number => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return isNaN(numAmount) ? 0 : numAmount;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidAmount = (amount: string | number): boolean => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(numAmount) && numAmount > 0;
};
