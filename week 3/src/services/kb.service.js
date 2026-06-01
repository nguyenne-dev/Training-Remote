require("dotenv").config();
const client = process.env.KB_CLIENT === "http" ? require("../clients/http-kb.client") : require("../clients/mock-kb.client");

async function search(keyword, topK = 5) {
  return client.search(keyword, topK);
}

async function list(nodePath, limit = 10) {
  return client.list(nodePath, limit);
}

async function retrieve(docId) {
  return client.retrieve(docId);
}

async function add(documentData) {
  return client.add(documentData);
}

module.exports = {
  search,
  list,
  retrieve,
  add,
};
