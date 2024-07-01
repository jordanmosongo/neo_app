export const capitalizeStrOnFirstLetter = (str) => {
  if(!str) {
    return '';
  }
  const smallizedStr = str.toLowerCase();
  return `${smallizedStr[0].toUpperCase()}${smallizedStr.slice(1)}`;
}