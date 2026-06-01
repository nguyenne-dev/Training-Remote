process.env.KB_CLIENT = "mock";
const { execSync } = require("child_process");

describe("KB CLI E2E", () => {
  describe("Search documents", () => {
    test("Tìm kiếm tài liệu", () => {
      const output = execSync(
        `node src/cli.js kb search template`,
      ).toString();

      expect(output).toContain("Customer Response Template");
      expect(output).toContain("Password Reset Template");
    });

    test("Tìm kiếm không có kết quả", () => {
      const output = execSync(
        `node src/cli.js kb search abcxyz`,
      ).toString();

      expect(output).toContain("No documents found");
    });

    test("Thiếu keyword", () => {
      const output = execSync(
        `node src/cli.js kb search`,
      ).toString();

      expect(output).toContain("Error:");
      expect(output).toContain("Query is required");
    });
  });

  describe("List documents", () => {
    test("Lấy danh sách theo nodePath", () => {
      const output = execSync(
        `node src/cli.js kb list /templates/email`,
      ).toString();

      expect(output).toContain("Customer Response Template");
      expect(output).toContain("Password Reset Template");
    });

    test("NodePath không tồn tại", () => {
      const output = execSync(
        `node src/cli.js kb list /not-found`,
      ).toString();

      expect(output).toContain("No documents found");
    });

    test("Thiếu nodePath", () => {
      const output = execSync(
        `node src/cli.js kb list`,
      ).toString();

      expect(output).toContain("Error:");
    });
  });

  describe("Retrieve document", () => {
    test("Lấy document theo id", () => {
      const output = execSync(
        `node src/cli.js kb retrieve doc-001`,
      ).toString();

      expect(output).toContain("Customer Response Template");
      expect(output).toContain("Thank you for contacting us");
    });

    test("Document không tồn tại", () => {
      const output = execSync(
        `node src/cli.js kb retrieve doc-999`,
      ).toString();

      expect(output).toContain("Error:");
      expect(output).toContain("Document not found");
    });
  });

  describe("Add document", () => {
    test("Thêm document thành công", () => {
      const output = execSync(
        `node src/cli.js kb add "New Guide" "Testing" "/docs" "guide,test"`,
      ).toString();

      expect(output).toContain("Document added:");
      expect(output).toContain("New Guide");
      expect(output).toContain("Testing");
    });

    test("Thiếu title", () => {
      const output = execSync(
        `node src/cli.js kb add "" "Testing" "/docs"`,
      ).toString();

      expect(output).toContain("Error:");
    });

    test("Thiếu content", () => {
      const output = execSync(
        `node src/cli.js kb add "New Guide" "" "/docs"`,
      ).toString();

      expect(output).toContain("Error:");
    });

    test("Thiếu nodePath", () => {
      const output = execSync(
        `node src/cli.js kb add "New Guide" "Testing"`,
      ).toString();

      expect(output).toContain("Error:");
    });
  });

  describe("Invalid KB command", () => {
    test("Command KB không hợp lệ", () => {
      const output = execSync(
        `node src/cli.js kb abc`,
      ).toString();

      expect(output).toContain("Invalid command");
      expect(output).toContain("node src/cli.js kb search template");
      expect(output).toContain("node src/cli.js kb list /templates/email");
      expect(output).toContain("node src/cli.js kb retrieve doc-001");
    });
  });
});