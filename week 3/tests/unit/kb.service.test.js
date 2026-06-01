jest.mock("../../src/clients/mock-kb.client", () => ({
  search: jest.fn(),
  list: jest.fn(),
  retrieve: jest.fn(),
  add: jest.fn(),
}));

const kbService = require("../../src/services/kb.service");
const mockClient = require("../../src/clients/mock-kb.client");

describe("KB Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("search", () => {
    test("gọi search của client với đúng tham số", async () => {
      mockClient.search.mockResolvedValue([
        {
          id: "doc-001",
          title: "Customer Response Template",
          content: "Thank you for contacting us...",
          nodePath: "/templates/email",
          tags: ["template", "email"],
        },
      ]);

      const result = await kbService.search("template");

      expect(result).toEqual([
        {
          id: "doc-001",
          title: "Customer Response Template",
          content: "Thank you for contacting us...",
          nodePath: "/templates/email",
          tags: ["template", "email"],
        },
      ]);
    });
  });

  describe("list", () => {
    test("gọi list của client với đúng tham số", async () => {
      mockClient.list.mockResolvedValue([
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
  });

  describe("retrieve", () => {
    test("gọi retrieve của client với đúng id", async () => {
      mockClient.retrieve.mockResolvedValue({
        id: "doc-001",
        title: "Customer Response Template",
        content: "Thank you for contacting us...",
        nodePath: "/templates/email",
        tags: ["template", "email"],
      });

      const result = await kbService.retrieve("doc-001");

      expect(result).toEqual({
        id: "doc-001",
        title: "Customer Response Template",
        content: "Thank you for contacting us...",
        nodePath: "/templates/email",
        tags: ["template", "email"],
      });
    });
  });

  describe("add", () => {
    test("gọi add của client với đúng dữ liệu", async () => {
      const newDocument = {
        title: "Test",
        content: "content",
        nodePath: "/docs",
      };

      mockClient.add.mockResolvedValue({
        id: "doc-999",
        ...newDocument,
      });

      const result = await kbService.add(newDocument);

      expect(result).toEqual({
        id: "doc-999",
        title: "Test",
        content: "content",
        nodePath: "/docs",
      });
    });
  });
});
