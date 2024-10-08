const applyMasking = (value: string, mask: string): string => {
  const { length } = value;
  const lastChar = value.charAt(length - 1);
  const alphaRegex = /[a-zA-Z]/; // NOSONAR
  const alphaNumericRegex = /[a-zA-Z0-9]/; // NOSONAR
  const specialCharsRegex = /[^a-zA-Z0-9]/; // NOSONAR

  let newValue;

  if (length > mask.length || alphaRegex.test(lastChar)) {
    // if user types more char then mask length
    newValue = value.slice(0, -1);
  } else if (specialCharsRegex.test(mask.charAt(length - 1))) {
    // if user reaches to special character
    const remainingMask = mask.substr(length - 1);
    const numberIndex = remainingMask.match(alphaNumericRegex)?.index;

    newValue = value.slice(0, -1) + remainingMask.substr(0, numberIndex) + value.slice(-1);
  } else if (specialCharsRegex.test(mask.charAt(length))) {
    // if user deletes the last special character
    newValue = value;
  } else {
    const remainingMask = mask.substr(length);
    const numberIndex = remainingMask.match(alphaNumericRegex)?.index;

    newValue = value + remainingMask.substr(0, numberIndex);
  }

  return newValue;
};

const getMaskedValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, mask: string) => {
  let maskedValue;

  const specialCharsRegex = /[^a-zA-Z0-9]/g; // NOSONAR
  const { value, selectionStart } = event.target;

  // TODO: Need to remove this if, when we handle masking when user deletes from the middle of the text
  if (selectionStart && selectionStart < value.length) {
    maskedValue = value.slice(0, selectionStart);
  } else {
    maskedValue = value
      .replace(specialCharsRegex, '')
      .split('')
      .reduce((acc: string, c: string) => applyMasking(acc + c, mask), '');
  }

  return maskedValue;
};

export default getMaskedValue;
