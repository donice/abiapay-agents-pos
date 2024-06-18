export function CamelCaseToTitleCase(s: string): string {
  return s.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}