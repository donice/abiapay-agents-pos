export const formatAmount = (input: number | string | undefined | null): string => {
    if (input === undefined || input === null) {
      return "-";
    }
  
    let num: number;
  
    if (typeof input === 'string') {
      const cleanedInput = input.replace(/,/g, '');
      num = parseFloat(cleanedInput);
    } else {
      num = input;
    }
  
    if (isNaN(num)) {
      return "error";
    }
  
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(3).replace(/\.0+$/, '') + 'M';
    } else if (num >= 100_000) {
      return (num / 1_000).toFixed(3).replace(/\.0+$/, '') + 'k';
    } else {
      return num.toLocaleString();
    }
  }
  