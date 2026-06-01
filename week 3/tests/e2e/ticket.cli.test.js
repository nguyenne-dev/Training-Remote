const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ticketPath = path.join(__dirname, "../../src/storage/ticket.json");

describe("Ticket CLI E2E", () => {
  beforeEach(() => {
    fs.writeFileSync(
      ticketPath,
      JSON.stringify(
        [
          {
            id: 1,
            title: "Default Ticket",
            completed: false,
          },
        ],
        null,
        2,
      ),
    );
  });

  describe("Add tickets", () => {
    test("Thêm ticket", () => {
      const output = execSync(`node src/cli.js add "Learn Node"`).toString();
      expect(output).toContain("Ticket added");
      expect(output).toContain("Learn Node");
      const tickets = JSON.parse(fs.readFileSync(ticketPath, "utf8"));
      expect(tickets[1]).toMatchObject({
        title: "Learn Node",
        completed: false,
      });
    });

    test("Thêm ticket rỗng", () => {
      const output = execSync(`node src/cli.js add ""`).toString();
      expect(output).toContain("Error: Title is required");
    });

    test("Thêm ticket thiếu title", () => {
      const output = execSync(`node src/cli.js add`).toString();
      expect(output).toContain("Error: Title is required");
    });
  });

  describe("List tickets", () => {
    test("Danh sách ticket có dữ liệu", () => {
      const output = execSync(`node src/cli.js list`).toString();
      expect(output).toContain("[ ] 1. Default Ticket");
    });

    test("Danh sách ticket rỗng", () => {
      fs.writeFileSync(ticketPath, "[]");
      const output = execSync(`node src/cli.js list`).toString();
      expect(output).toContain("No tickets found");
    });
  });

  describe("Complete tickets", () => {
    test("Hoàn thành ticket thành công", () => {
      const output = execSync(`node src/cli.js complete 1`).toString();
      expect(output).toContain("Ticket completed");
      expect(output).toContain("Default Ticket");
      const tickets = JSON.parse(fs.readFileSync(ticketPath, "utf8"));
      expect(tickets[0]).toMatchObject({
        id: 1,
        title: "Default Ticket",
        completed: true,
      });
    });

    test("Hoàn thành ticket không tồn tại", () => {
      const output = execSync(`node src/cli.js complete 999`).toString();
      expect(output).toContain("Error: Ticket not found");
    });

    test("Hoàn thành ticket thiếu id", () => {
      const output = execSync(`node src/cli.js complete`).toString();
      expect(output).toContain("Error: Ticket not found");
    });
  });

  describe("Delete tickets", () => {
    test("Xóa ticket thành công", () => {
      const output = execSync(`node src/cli.js delete 1`).toString();
      expect(output).toContain("Ticket deleted");
      const tickets = JSON.parse(fs.readFileSync(ticketPath, "utf8"));
      expect(tickets).toEqual([]);
    });

    test("Xóa ticket không tồn tại", () => {
      const output = execSync(`node src/cli.js delete 999`).toString();
      expect(output).toContain("Error: Ticket not found");
    });

    test("Xóa ticket thiếu id", () => {
      const output = execSync(`node src/cli.js delete`).toString();
      expect(output).toContain("Error: Ticket not found");
    });

    test("Xóa xong danh sách rỗng", () => {
      execSync(`node src/cli.js delete 1`);
      const output = execSync(`node src/cli.js list`).toString();
      expect(output).toContain("No tickets found");
    });
  });

  describe("Invalid command", () => {
    test("Command không hợp lệ", () => {
      const output = execSync(`node src/cli.js abc`).toString();
      expect(output).toContain("Invalid command");
      expect(output).toContain("Commands:");
      expect(output).toContain('node src/cli.js add "Ticket title"');
      expect(output).toContain("node src/cli.js list");
      expect(output).toContain("node src/cli.js complete 1");
      expect(output).toContain("node src/cli.js delete 1");
    });
  });
});
