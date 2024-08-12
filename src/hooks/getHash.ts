export const hashStringToAlphanumeric = (str: string): string => {
  let hash = 0;
  if (str.length === 0) return "";

  for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; 
  }

  return Math.abs(hash).toString(36);
}
