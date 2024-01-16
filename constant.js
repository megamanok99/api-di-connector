export function extractContentInBraces(text = '') {
  const regex = /\{([\s\S]*?)\}/;
  const match = text.match(regex);

  if (match && match[1]) {
    return match[1].trim();
  } else {
    return null;
  }
}
export function extractContentBeforeClass(text = '') {
  const regex = /class([\s\S]*)/;
  const match = text.split('class');

  if (match && match[0]) {
    return match[0];
  } else {
    return null;
  }
}
