function formatAmount(value: number): string {
  const absValue = Math.abs(value);

  if (absValue < 1000) {
    return value.toString();
  }

  const suffixes = ["", "K", "M", "B", "T"];
  const suffixIndex = Math.floor(Math.log(absValue) / Math.log(1000));

  const formattedValue = (value / (1000 ** suffixIndex)).toFixed(1);
  const formattedSuffix = suffixes[suffixIndex];

  return `${formattedValue}${formattedSuffix}`;
}
