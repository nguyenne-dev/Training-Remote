const {
  addTicket,
  listTickets,
  completeTicket,
  deleteTicket,
  clearTickets,
} = require("../../src/services/ticket.service");

describe("Ticket Service Unit Test", () => {
  beforeEach(() => {
    clearTickets();
  });
  describe("addTicket", () => {
    test("Tạo ticket với title là chuỗi", () => {
      const ticket = addTicket("Title");
      expect(ticket.title).toBe("Title");
      expect(ticket.completed).toBe(false);
      expect(typeof ticket.id).toBe("number");
    });

    test("Tạo ticket với title là số", () => {
      const ticket = addTicket(123);
      expect(ticket.title).toBe("123");
      expect(ticket.completed).toBe(false);
      expect(typeof ticket.id).toBe("number");
    });

    test("Tạo ticket với thông tin có khoảng trắng đầu cuối", () => {
      const ticket = addTicket("   Title   ");
      expect(ticket.title).toBe("Title");
      expect(ticket.completed).toBe(false);
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

  describe("listTickets", () => {
    test("Lấy thành công danh sách", () => {
      const tickets = listTickets();

      expect(tickets).toEqual([
        {
          id: 1,
          title: "Ticket 1",
          completed: false,
        },
        {
          id: 2,
          title: "Ticket 2",
          completed: false,
        },
      ]);
    });
  });

  describe("completeTicket", () => {
    test("Hoàn thành ticket", () => {
      const result = completeTicket(1);
      expect(result.completed).toBe(true);
    });

    test("Không tìm thấy ticket", () => {
      expect(() => completeTicket(123)).toThrow("Ticket not found");
    });
  });

  describe("deleteTicket", () => {
    test("Xóa thành công ticket", () => {
      const result = deleteTicket(1);
      expect(result).toBe(true);
    });

    test("Xóa thất bại", () => {
      expect(() => deleteTicket(999)).toThrow("Ticket not found");
    });
  });
});
