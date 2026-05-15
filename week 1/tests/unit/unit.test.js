jest.mock("../../src/repositories/todo.repository.js", () => ({
  save: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const repository = require("../../src/repositories/todo.repository");

const {
  addTodo,
  listTodos,
  completeTodo,
  deleteTodo,
} = require("../../src/services/todo.service");

describe("Todo Service Unit Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    repository.save.mockImplementation((todo) => (todo));
  });

  describe("addTodo", () => {
    test("Tạo todo với thông tin đúng (Số hoặc chuỗi)", () => {
      const todo = addTodo(123);
      expect(todo.title).toBe("123");
      expect(todo.completed).toBe(false);
      expect(typeof todo.id).toBe("number");
    });

    test("Tạo todo với thông tin có khoảng trắng", () => {
      const todo = addTodo("123   ");
      expect(todo.title).toBe("123");
      expect(todo.completed).toBe(false);
      expect(typeof todo.id).toBe("number");
    });

    test("Title rỗng", () => {
      expect(() => addTodo()).toThrow("Title is required");
    });

    test("Title undefined", () => {
      expect(() => addTodo()).toThrow("Title is required");
    });

    test("Title chỉ có khoảng trắng", () => {
      expect(() => addTodo("   ")).toThrow("Title is required");
    });
    
    test("Title khác chuỗi hoặc số", () => {
      expect(() => addTodo([1, 2])).toThrow("Title must be a string or number");
    });
  });

  describe("listTodos", () => {
    test("Lấy thành công danh sách", () => {
      const mockTodos = [
        {
          id: 1,
          title: "Task 1",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Task 2",
          completed: true,
          createdAt: new Date().toISOString()
        },
      ];

      repository.findAll.mockReturnValue(mockTodos);

      const todos = listTodos();

      expect(todos).toEqual(mockTodos);
    });
  });

  describe("completeTodo", () => {
    test("Hoàn thành todo", () => {
      const mockTodo = {
        id: 1,
        title: "Learn TDD",
        completed: false,
      };

      repository.findById.mockReturnValue(mockTodo);

      repository.update.mockReturnValue({
        ...mockTodo,
        completed: true,
      });

      const updatedTodo = completeTodo(1);

      expect(updatedTodo.completed).toBe(true);
    });

    test("Không tìm thấy todo", () => {
      repository.findById.mockReturnValue(null);

      expect(() => completeTodo(999)).toThrow("Todo not found");
    });
  });

  describe("deleteTodo", () => {
    test("Xóa thành công todo", () => {
      repository.remove.mockReturnValue(true);

      const result = deleteTodo(1);

      expect(result).toBe(true);
    });

    test("Xóa thất bại", () => {
      repository.remove.mockReturnValue(null);

      expect(() => deleteTodo(999)).toThrow("Todo not found");
    });
  });
});
