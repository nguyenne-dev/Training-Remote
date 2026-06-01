const URL = process.env.KB_URL || "http://localhost:3000";

async function search(query, topK = 5) {
  if (!query?.trim()) {
    throw new Error("Query is required");
  }

  if (topK <= 0) {
    throw new Error("TopK must be greater than 0");
  }

  const res = await fetch(`${URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      topK,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to search documents");
  }

  const data = await res.json();

  return data.results;
}

async function list(nodePath, limit = 10) {
  if (!nodePath?.trim()) {
    throw new Error("Node path is required");
  }

  const res = await fetch(`${URL}/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nodePath,
      limit,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to list documents");
  }

  const data = await res.json();

  return data.results;
}

async function retrieve(docId) {
  if (!docId?.trim()) {
    throw new Error("Document id is required");
  }

  const res = await fetch(`${URL}/retrieve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      docId,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Document not found");
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

  const res = await fetch(`${URL}/add`, {
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
    const error = await res.json();
    throw new Error(error.error || "Failed to add document");
  }

  return res.json();
}

module.exports = {
  search,
  list,
  retrieve,
  add,
};
