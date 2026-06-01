// const express = require("express");
// const fs = require("fs");

// const app = express();
// app.use(express.json());

// const DB_FILE = "./data.json";

// // helper đọc file
// const readDB = () => {
//   const data = fs.readFileSync(DB_FILE, "utf-8");
//   return JSON.parse(data);
// };

// // helper ghi file
// const writeDB = (data) => {
//   fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
// };

// // seed gốc để reset
// const seed = [
//   {
//     "id": "doc-001",
//     "title": "Customer Response Template",
//     "content": "Thank you for contacting us...",
//     "nodePath": "/templates/email",
//     "tags": [
//       "template",
//       "email"
//     ]
//   },
//   {
//     "id": "doc-002",
//     "title": "DevOps Team Members",
//     "content": "John, David, Sarah",
//     "nodePath": "/team/devops",
//     "tags": [
//       "team",
//       "devops"
//     ]
//   },
//   {
//     "id": "doc-003",
//     "title": "API Integration Guide",
//     "content": "Step 1: Read API docs...",
//     "nodePath": "/docs/guides",
//     "tags": [
//       "guide",
//       "api"
//     ]
//   },
//   {
//     "id": "doc-004",
//     "title": "Project Roadmap",
//     "content": "Q1 2023: Launch new features...",
//     "nodePath": "/projects/roadmap",
//     "tags": [
//       "project",
//       "roadmap"
//     ]
//   },
//   {
//     "id": "doc-005",
//     "title": "Password Reset Template",
//     "content": "Click the link to reset your password...",
//     "nodePath": "/templates/email",
//     "tags": [
//       "template",
//       "email"
//     ]
//   }
// ];

// app.post("/documents/search", (req, res) => {
//   try {
//     const { q, topK = 5 } = req.body;

//     if (!q?.trim()) throw new Error("Query is required");

//     const keyword = q.toLowerCase();

//     const result = readDB()
//       .filter(
//         (d) =>
//           d.title.toLowerCase().includes(keyword) ||
//           d.content.toLowerCase().includes(keyword)
//       )
//       .slice(0, Number(topK));

//     res.json(result);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.post("/documents", (req, res) => {
//   try {
//     const { nodePath, limit = 10 } = req.body;

//     if (!nodePath?.trim()) {
//       return res.status(400).json({ error: "nodePath is required" });
//     }

//     const result = readDB()
//       .filter((d) => d.nodePath === nodePath)
//       .slice(0, Number(limit));

//     res.json(result);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.post("/documents/:id", (req, res) => {
//   try {
//     const doc = readDB().find((d) => d.id === req.params.id);

//     if (!doc) {
//       return res.status(404).json({ error: "Not found" });
//     }

//     res.json(doc);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.post("/documents", (req, res) => {
//   try {
//     const { title, content, nodePath, tags = [] } = req.body;

//     if (!title) throw new Error("title required");
//     if (!content) throw new Error("content required");
//     if (!nodePath) throw new Error("nodePath required");

//     const db = readDB();

//     const newDoc = {
//       id: `doc-${Date.now()}`,
//       title,
//       content,
//       nodePath,
//       tags,
//     };

//     db.push(newDoc);
//     writeDB(db);

//     res.json(newDoc);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.post("/reset", (req, res) => {
//   try {
//     writeDB(seed);
//     res.json({ ok: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });

const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const DB_FILE = "./data.json";

const readDB = () => {
  const data = fs.readFileSync(DB_FILE, "utf8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

const seed = [
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
];

app.post("/search", (req, res) => {
  try {
    const { query, topK = 5 } = req.body;

    if (!query?.trim()) {
      throw new Error("Query is required");
    }

    if (topK <= 0) {
      throw new Error("TopK must be greater than 0");
    }

    const keyword = query.toLowerCase();

    const results = readDB()
      .filter(
        (doc) =>
          doc.title.toLowerCase().includes(keyword) ||
          doc.content.toLowerCase().includes(keyword),
      )
      .slice(0, Number(topK))
      .map((doc) => ({
        id: doc.id,
        title: doc.title,
        nodePath: doc.nodePath,
      }));

    res.json({ results });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

app.post("/list", (req, res) => {
  try {
    const { nodePath, limit = 10 } = req.body;

    if (!nodePath?.trim()) {
      throw new Error("Node path is required");
    }

    const results = readDB()
      .filter((doc) => doc.nodePath === nodePath)
      .slice(0, Number(limit));

    res.json({
      results,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

app.post("/retrieve", (req, res) => {
  try {
    const { docId } = req.body;

    if (!docId?.trim()) {
      throw new Error("Document id is required");
    }

    const document = readDB().find((doc) => doc.id === docId);

    if (!document) {
      throw new Error("Document not found");
    }

    res.json(document);
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
});

app.post("/add", (req, res) => {
  try {
    const { title, content, nodePath, tags = [] } = req.body;

    if (!title?.trim()) {
      throw new Error("Title is required");
    }

    if (!content?.trim()) {
      throw new Error("Content is required");
    }

    if (!nodePath?.trim()) {
      throw new Error("Node path is required");
    }

    const db = readDB();

    const document = {
      id: `doc-${Date.now()}`,
      title,
      content,
      nodePath,
      tags,
    };

    db.push(document);

    writeDB(db);

    res.json(document);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

app.post("/reset", (req, res) => {
  try {
    writeDB(seed);

    res.json({
      ok: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});