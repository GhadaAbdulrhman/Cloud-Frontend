const Search = (array, value) => {
  return array.find(({ _id }) => {
    return _id === value;
  });
};

export default Search;
