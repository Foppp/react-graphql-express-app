export default (birthDate) => {
  if (birthDate === '') return '';
  const diff = Date.now() - new Date(birthDate);
  const age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970);
};