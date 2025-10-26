export const fillByLabel = async (page, labelText, value) => {
  const input = page.getByLabel(labelText);
  await input.fill(value.toString());
}
