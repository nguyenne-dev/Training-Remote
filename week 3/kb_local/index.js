const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const DB_FILE = "./data.json";

// helper đọc file
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
};

// helper ghi file
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// seed gốc để reset
const seed = [
  {
    "id": "doc-001",
    "title": "Customer Response Template",
    "content": "Thank you for contacting us...",
    "nodePath": "/templates/email",
    "tags": [
      "template",
      "email"
    ]
  },
  {
    "id": "doc-002",
    "title": "DevOps Team Members",
    "content": "John, David, Sarah",
    "nodePath": "/team/devops",
    "tags": [
      "team",
      "devops"
    ]
  },
  {
    "id": "doc-003",
    "title": "API Integration Guide",
    "content": "Step 1: Read API docs...",
    "nodePath": "/docs/guides",
    "tags": [
      "guide",
      "api"
    ]
  },
  {
    "id": "doc-004",
    "title": "Project Roadmap",
    "content": "Q1 2023: Launch new features...",
    "nodePath": "/projects/roadmap",
    "tags": [
      "project",
      "roadmap"
    ]
  },
  {
    "id": "doc-005",
    "title": "Password Reset Template",
    "content": "Click the link to reset your password...",
    "nodePath": "/templates/email",
    "tags": [
      "template",
      "email"
    ]
  }
];

app.get("/documents/search", (req, res) => {
  try {
    const { q, topK = 5 } = req.query;

    if (!q?.trim()) throw new Error("Query is required");

    const keyword = q.toLowerCase();

    const result = readDB()
      .filter(
        (d) =>
          d.title.toLowerCase().includes(keyword) ||
          d.content.toLowerCase().includes(keyword)
      )
      .slice(0, Number(topK));

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/documents", (req, res) => {
  try {
    const { nodePath, limit = 10 } = req.query;

    if (!nodePath?.trim()) {
      return res.status(400).json({ error: "nodePath is required" });
    }

    const result = readDB()
      .filter((d) => d.nodePath === nodePath)
      .slice(0, Number(limit));

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/documents/:id", (req, res) => {
  try {
    const doc = readDB().find((d) => d.id === req.params.id);

    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/documents", (req, res) => {
  try {
    const { title, content, nodePath, tags = [] } = req.body;

    if (!title) throw new Error("title required");
    if (!content) throw new Error("content required");
    if (!nodePath) throw new Error("nodePath required");

    const db = readDB();

    const newDoc = {
      id: `doc-${Date.now()}`,
      title,
      content,
      nodePath,
      tags,
    };

    db.push(newDoc);
    writeDB(db);

    res.json(newDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/reset", (req, res) => {
  try {
    writeDB(seed);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});