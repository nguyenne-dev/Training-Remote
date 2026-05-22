jest.mock("../../src/repositories/ticket.repository.js", () => ({
  save: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const repository = require("../../src/repositories/ticket.repository");

const {
  addTicket,
  listTickets,
  completeTicket,
  deleteTicket,
} = require("../../src/services/ticket.service");

describe("Ticket Service Unit Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("addTicket", () => {
    beforeEach(() => {
      repository.save.mockImplementation((ticket) => ticket);
    });
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
      const mockTickets = [
        {
          id: 1,
          title: "Ticket 1",
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Ticket 2",
          completed: true,
          createdAt: new Date().toISOString(),
        },
      ];
      repository.findAll.mockImplementation(() => mockTickets);
      const tickets = listTickets();

      expect(tickets).toEqual(mockTickets);
    });
  });

  describe("completeTicket", () => {
    test("Hoàn thành ticket thành công", () => {
      const mockTicket = {
        id: 1,
        title: "Learn TDD",
        completed: false,
      };

      repository.findById.mockReturnValue(mockTicket);

      repository.update.mockReturnValue({
        ...mockTicket,
        completed: true,
      });

      const result = completeTicket(1);

      expect(result.completed).toBe(true);
    });

    test("Không tìm thấy ticket", () => {
      repository.findById.mockReturnValue(null);
      expect(() => completeTicket(123)).toThrow("Ticket not found");
    });
  });

  describe("deleteTicket", () => {
    test("Xóa thành công ticket", () => {
      repository.remove.mockReturnValue(true);
      const result = deleteTicket(1);
      expect(result).toBe(true);
    });

    test("Xóa thất bại", () => {
      repository.remove.mockReturnValue(null);
      expect(() => deleteTicket(999)).toThrow("Ticket not found");
    });
  });
});
