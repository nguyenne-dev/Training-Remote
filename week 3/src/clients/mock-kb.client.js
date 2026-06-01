const documents = [
  {
    id: "doc-001",
    title: "Customer Response Template",
    content: "Thank you for contacting us...",
    nodePath: "/templates/email",
    tags: ["template", "email"],
  },
  {
    id: "doc-002",
    title: "DevOps Team Members",
    content: "John, David, Sarah",
    nodePath: "/team/devops",
    tags: ["team", "devops"],
  },
  {
    id: "doc-003",
    title: "API Integration Guide",
    content: "Step 1: Read API docs...",
    nodePath: "/docs/guides",
    tags: ["guide", "api"],
  },
  {
    id: "doc-004",
    title: "Project Roadmap",
    content: "Q1 2023: Launch new features...",
    nodePath: "/projects/roadmap",
    tags: ["project", "roadmap"],
  },
  {
    id: "doc-005",
    title: "Password Reset Template",
    content: "Click the link to reset your password...",
    nodePath: "/templates/email",
    tags: ["template", "email"],
  },
  {
    id: "doc-006",
    title: "Onboarding Checklist",
    content: "1. Set up email...",
    nodePath: "/templates/checklist",
    tags: ["template", "checklist"],
  },
];

async function search(query, topK = 5) {
  if (!query?.trim()) {
    throw new Error("Query is required");
  }

  if (topK <= 0) {
    throw new Error("TopK must be greater than 0");
  }

  const keyword = query.toLowerCase();

  const results = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(keyword) ||
      doc.content.toLowerCase().includes(keyword),
  );

  return results.slice(0, topK);
}

async function list(nodePath, limit = 10) {
  if (!nodePath?.trim()) {
    throw new Error("Node path is required");
  }

  return documents.filter((doc) => doc.nodePath === nodePath).slice(0, limit);
}

async function retrieve(docId) {
  if (!docId?.trim()) {
    throw new Error("Document id is required");
  }

  const document = documents.find((doc) => doc.id === docId);

  if (!document) {
    throw new Error("Document not found");
  }

  return document;
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

  const document = {
    id: `doc-${Date.now()}`,
    title,
    content,
    nodePath,
    tags,
  };

  documents.push(document);

  return document;
}

module.exports = {
  search,
  list,
  retrieve,
  add,
};
