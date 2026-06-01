const URL = process.env.KB_URL || "http://localhost:3000";

async function search(query, topK = 5) {
  console.log("Searching for:", query, "TopK:", topK);
  if (!query?.trim()) {
    throw new Error("Query is required");
  }

  if (topK <= 0) {
    throw new Error("TopK must be greater than 0");
  }

  const res = await fetch(
    `${URL}/documents/search?q=${query}&topK=${topK}`,
  );

  if (!res.ok) {
    throw new Error("Failed to search documents");
  }

  return await res.json();
}

async function list(nodePath, limit = 10) {
  if (!nodePath?.trim()) {
    throw new Error("Node path is required");
  }

  const res = await fetch(
    `${URL}/documents?nodePath=${nodePath}&limit=${limit}`,
  );

  if (!res.ok) {
    throw new Error("Failed to list documents");
  }

  return res.json();
}

async function retrieve(docId) {
  if (!docId?.trim()) {
    throw new Error("Document id is required");
  }

  const res = await fetch(`${URL}/documents/${docId}`);

  if (!res.ok) {
    throw new Error("Document not found");
  }

  return res.json();
}

async function add(documentData) {
  const { title, content, nodePath, tags = [] } = documentData;

  if (!title?.trim()) {
    throw new Error("Title is required");
  }

  if (!content?.trim()) {
    throw new Error("Content is required");
  }

  if (!nodePath?.trim()) {
    throw new Error("Node path is required");
  }

  const res = await fetch(`${URL}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      nodePath,
      tags,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add document");
  }

  return res.json();
}

module.exports = {
  search,
  list,
  retrieve,
  add,
};
