const {
  search,
  list,
  retrieve,
  add,
} = require("../../src/clients/mock-kb.client");
describe("MockKBClient", () => {
  describe("search", () => {
    test("trả về data khớp với tiêu đề", async () => {
      const result = await search("template");

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

    test("trả về data khớp với nội dung", async () => {
      const result = await search("api docs");

      expect(result).toHaveLength(1);
      expect(result).toEqual([
        {
          id: "doc-003",
          title: "API Integration Guide",
          content: "Step 1: Read API docs...",
          nodePath: "/docs/guides",
          tags: ["guide", "api"],
        },
      ]);
    });

    test("giới hạn số lượng kết quả theo topK", async () => {
      const result = await search("template", 1);

      expect(result).toHaveLength(1);
    });

    test("ném lỗi khi query rỗng", async () => {
      await expect(search("")).rejects.toThrow("Query is required");
    });

    test("ném lỗi khi topK không hợp lệ", async () => {
      await expect(search("template", 0)).rejects.toThrow(
        "TopK must be greater than 0",
      );
    });
  });

  describe("list", () => {
    test("trả về danh sách data theo node path", async () => {
      const result = await list("/templates/email");
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

    test("giới hạn số lượng data trả về", async () => {
      const result = await list("/templates/email", 1);

      expect(result).toHaveLength(1);
    });

    test("ném lỗi khi node path rỗng", async () => {
      await expect(list("")).rejects.toThrow("Node path is required");
    });
  });

  describe("retrieve", () => {
    test("trả về data theo id", async () => {
      const result = await retrieve("doc-001");

      expect(result.id).toBe("doc-001");
      expect(result).toEqual({
        id: "doc-001",
        title: "Customer Response Template",
        content: "Thank you for contacting us...",
        nodePath: "/templates/email",
        tags: ["template", "email"],
      });
    });

    test("ném lỗi khi document id rỗng", async () => {
      await expect(retrieve("")).rejects.toThrow("Document id is required");
    });

    test("ném lỗi khi không tìm thấy data", async () => {
      await expect(retrieve("doc-999")).rejects.toThrow("Document not found");
    });
  });

  describe("add", () => {
    test("thêm data mới thành công", async () => {
      const newDocument = {
        title: "New Guide",
        content: "How to test",
        nodePath: "/docs/test",
        tags: ["guide"],
      };

      const result = await add(newDocument);

      expect(result.title).toBe(newDocument.title);
      expect(result.content).toBe(newDocument.content);
      expect(result.nodePath).toBe(newDocument.nodePath);
      expect(result.tags).toEqual(newDocument.tags);
      expect(result.id).toContain("doc-");
    });

    test("ném lỗi khi tiêu đề rỗng", async () => {
      await expect(
        add({
          title: "",
          content: "content",
          nodePath: "/docs",
        }),
      ).rejects.toThrow("Title is required");
    });

    test("ném lỗi khi nội dung rỗng", async () => {
      await expect(
        add({
          title: "Test",
          content: "",
          nodePath: "/docs",
        }),
      ).rejects.toThrow("Content is required");
    });

    test("ném lỗi khi node path rỗng", async () => {
      await expect(
        add({
          title: "Test",
          content: "content",
          nodePath: "",
        }),
      ).rejects.toThrow("Node path is required");
    });
  });
});
