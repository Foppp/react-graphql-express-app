const sortByNewest = (data) => {
  if (data.length < 2) {
    return data;
  }
  const pivot = data[Math.floor(data.length / 2)];
  const less = data.filter((el) => Date.parse(el.createdAt) < Date.parse(pivot.createdAt));
  const equal = data.filter((el) => Date.parse(el.createdAt) === Date.parse(pivot.createdAt));
  const more = data.filter((el) => Date.parse(el.createdAt) > Date.parse(pivot.createdAt));
  return [...sortByNewest(more), ...equal, ...sortByNewest(less)];
};

export default sortByNewest;
