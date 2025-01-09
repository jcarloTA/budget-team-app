export const formatCurrency = (amount: number | string): string => {
    // Si el valor es un string, intentar convertirlo a número
    const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
    // Verificar si el valor es un número válido
    if (isNaN(parsedAmount)) {
      return 'Invalid amount';
    }
  
    // Formatear el número con comas para miles y asegurando dos decimales
    return `Q${parsedAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };