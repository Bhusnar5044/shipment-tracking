export const emailValidator = (value: string, isRequired?: boolean) => {
  if (value === '' && isRequired) {
    return 'Please enter an Email';
  } else if (value === '' && !isRequired) {
    return '';
  } else if (
    !value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return 'Please enter valid email';
  } else {
    return '';
  }
};
