export const capitalizeStrOnFirstLetter = (str) => {
  if(!str) {
    return '';
  }
  return str
    .toLowerCase()
    .replace(/(^|\s|\.)\S/g, match => match.toUpperCase());
}
