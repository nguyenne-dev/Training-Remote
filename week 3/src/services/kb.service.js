async function search(keyword, client) {
  return client.search(keyword);
}

module.exports = {
  search,
};