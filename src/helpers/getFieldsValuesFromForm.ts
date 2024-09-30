export function getFieldsValuesFromForm(form: HTMLFormElement) {
  const formData = new FormData(form);
  const data: { [key: string]: string } = {};

  formData.forEach((value, key) => {
    data[key] = value as string;
  });

  return data;
}