process.env.KB_CLIENT = "mock";

const kbService = require("../../src/services/kb.service");

describe("KB Service Integration", () => {
  describe("search", () => {
    test("tìm kiếm tài liệu", async () => {
      const result = await kbService.search("template");

      expect(result).toHaveLength(2);

      expect(result).toEqual([
        {
          id: "doc-001",
          title: "Customer Response Template",
          content: "Thank you for contacting us...",
          nodePath: "/templates/email",
          tags: ["template", "email"],
        },
        {
          id: "doc-005",
          title: "Password Reset Template",
          content: "Click the link to reset your password...",
          nodePath: "/templates/email",
          tags: ["template", "email"],
        },
      ]);
    });

    test("query rỗng", async () => {
      await expect(kbService.search("")).rejects.toThrow("Query is required");
    });
  });

  describe("list", () => {
    test("lấy danh sách theo node path", async () => {
      const result = await kbService.list("/templates/email");

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        {
          id: "doc-001",
          title: "Customer Response Template",
          content: "Thank you for contacting us...",
          nodePath: "/templates/email",
          tags: ["template", "email"],
        },
        {
          id: "doc-005",
          title: "Password Reset Template",
          content: "Click the link to reset your password...",
          nodePath: "/templates/email",
          tags: ["template", "email"],
        },
      ]);
    });

    test("node path rỗng", async () => {
      await expect(kbService.list("")).rejects.toThrow("Node path is required");
    });
  });

  describe("retrieve", () => {
    test("lấy document theo id", async () => {
      const result = await kbService.retrieve("doc-001");

      expect(result).toEqual({
        id: "doc-001",
        title: "Customer Response Template",
        content: "Thank you for contacting us...",
        nodePath: "/templates/email",
        tags: ["template", "email"],
      });
    });

    test("document không tồn tại", async () => {
      await expect(kbService.retrieve("doc-999")).rejects.toThrow(
        "Document not found",
      );
    });
  });

  describe("add", () => {
    test("thêm document", async () => {
      const result = await kbService.add({
        title: "New Guide",
        content: "Testing",
        nodePath: "/docs",
      });

      expect(result).toEqual({
        id: expect.any(String),
        title: "New Guide",
        content: "Testing",
        nodePath: "/docs",
        tags: [],
      });
    });

    test("thiếu title", async () => {
      await expect(
        kbService.add({
          title: "",
          content: "content",
          nodePath: "/docs",
        }),
      ).rejects.toThrow("Title is required");
    });
  });
});
