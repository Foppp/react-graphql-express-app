export default (currentPage, perPage, data) => {
  return data.slice((currentPage * perPage) - perPage, currentPage * perPage);
};