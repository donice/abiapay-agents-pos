export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const transformDate = (dateString: string): string => {
    const [a, b, c] = dateString.split(/[-/]/).map(Number);
    const year = a > 31 ? a : c;
    const day = c > 31 ? a : b > 12 ? b : c;
    const month = [a, b, c].find(part => part !== year && part !== day);

    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

