export default (date) => {
  if (date === '') return '';
  return new Date(date).toLocaleDateString();
};
