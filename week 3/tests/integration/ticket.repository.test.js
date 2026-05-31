const {
  addTicket,
  listTickets,
  completeTicket,
  deleteTicket,
  getTicket,
} = require("../../src/services/ticket.service");

const fs = require("fs");
const path = require("path");
const { findById, findAll } = require("../../src/repositories/ticket.repository");

const STORAGE_PATH = path.join(__dirname, "../../src/storage/ticket.json");

describe("Ticket Service Integration Test", () => {
  beforeEach(() => {
    fs.writeFileSync(STORAGE_PATH, JSON.stringify([]));
  });
  describe("addTicket", () => {
    test("Tạo ticket với title là chuỗi", () => {
      const ticket = addTicket("Test Ticket Create");
      const storedTicket = findById(ticket.id);
      
      expect(ticket.title).toBe(storedTicket.title);
      expect(ticket.title).toBe("Test Ticket Create");
      expect(ticket.completed).toBe(storedTicket.completed);
      expect(typeof ticket.id).toBe("number");
    });

    test("Tạo ticket với title là số", () => {
      const ticket = addTicket(123);
      const storedTicket = findById(ticket.id);
      expect(ticket.title).toBe(storedTicket.title);
      expect(ticket.title).toBe("123");
      expect(ticket.completed).toBe(storedTicket.completed);
      expect(typeof ticket.id).toBe("number");
    });

    test("Tạo ticket với thông tin có khoảng trắng đầu cuối", () => {
      const ticket = addTicket("   Test Ticket   ");
      const storedTicket = findById(ticket.id);
      expect(ticket.title).toBe(storedTicket.title);
      expect(ticket.title).toBe("Test Ticket");
      expect(ticket.completed).toBe(storedTicket.completed);
      expect(typeof ticket.id).toBe("number");
    });

    test("Title rỗng", () => {
      expect(() => addTicket("")).toThrow("Title is required");
    });

    test("Title undefined", () => {
      expect(() => addTicket()).toThrow("Title is required");
    });

    test("Title chỉ có khoảng trắng", () => {
      expect(() => addTicket("   ")).toThrow("Title is required");
    });

    test("Title invalid", () => {
      expect(() => addTicket([1, 2])).toThrow(
        "Title must be a string or number",
      );
    });
  });

  describe("getTicket", () => {
    test("Lấy thành công ticket", () => {
      const ticket = addTicket("Test Ticket Get");
      const result = getTicket(ticket.id);

      expect(result).toEqual(ticket);
    });

    test("ID là số dạng string", () => {
      const ticket = addTicket("Test Ticket Get");
      const result = getTicket(ticket.id.toString());

      expect(result).toEqual(ticket);
    });
    test("ID rỗng", () => {
      expect(() => getTicket("")).toThrow("TicketId is required");
    });

    test("Không tìm thấy ticket", () => {
      expect(() => getTicket(-1)).toThrow("Ticket not found");
    });

    test("ID không phải số", () => {
      expect(() => getTicket("abc")).toThrow("TicketId must be a number");
    });
  });

  describe("listTickets", () => {
    test("Trả về danh sách tất cả ticket", () => {
      const ticket1 = addTicket("Test Ticket Get 1");
      const ticket2 = addTicket("Test Ticket Get 2");
      const tickets = listTickets();

      const result = findAll();
      expect(tickets).toEqual(result);
    });
  });

  describe("completeTicket", () => {
    test("Hoàn thành ticket", () => {
      const ticket1 = addTicket("Test Ticket Update 1");
      const result = completeTicket(ticket1.id);
      expect(result.completed).toBe(true);
    });

    test("Không tìm thấy ticket", () => {
      expect(() => completeTicket(123)).toThrow("Ticket not found");
    });
  });

  describe("deleteTicket", () => {
    test("Xóa thành công ticket", () => {
      const ticket1 = addTicket("Test Ticket Delete 1");
      const result = deleteTicket(ticket1.id);
      expect(result).toBe(true);
    });

    test("Xóa thất bại", () => {
      expect(() => deleteTicket(999)).toThrow("Ticket not found");
    });
  });
});
