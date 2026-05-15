# Week 1

## 1. TDD là gì và mục tiêu chính của nó là gì?

### Định nghĩa

Test-Driven Development (TDD) là cách lập trình theo cấu trúc viết test trước, lập trình sau

Quy trình của TDD là 1 vòng lăp Red - Green - Refactor.

### Mục tiêu của TDD:

- Tăng độ ổn định của phần mềm
- Thiết kế architecture tốt hơn
- Kiểm soát chất lượng code do AI generate
- Kiểm tra behavior thường xuyên trong quá trình develop

## 2. Red Green Refactor

### Red:

Viết test trước khi lập trình tính năng, bước này chạy test sẽ FAIL

- **Mục đích**
  - Xác định hành vi
  - Làm rõ yêu cầu trước khi code

- **Ví dụ**:

```js
const { createTicket } = require("../src/ticket.service");
test("create_01", () => {
  const ticket = createTicket("Learn TDD");
  expect(ticket.title).toBe("Learn TDD");
});
```

- Vì chưa có chức năng createTicket
- Kết quả mong muốn: FAIL

### Green

Viết code tối thiểu để có thể pass test Red vừa viết

- **Ví dụ**:

```js
exports.createTicket = (title) => {
  return {
    title,
    completed: false,
  };
};
```

- Chạy lại test
- Kết quả: PASS

### Refactor

Tối ưu code nhưng không thay đổi các hành vi ban đầu

- **Ví dụ**:
  - Đổi tên biến
  - Tách hàm
  - Giảm trùng lặp
  - Tăng readability
  - Tách nhỏ vai trò

## 3. Testing Levels
**So sánh nhanh**

| Testing Type     | Scope                             | Speed  | External Dependency    | Main Purpose                  |
| ---------------- | --------------------------------- | ------ | ---------------------- | ----------------------------- |
| Unit Test        | Single function/module            | Fast   | Mocked                 | Verify business logic         |
| Integration Test | Multiple modules working together | Medium | Real database/file/API | Verify module interaction     |
| End-to-End Test  | Whole application flow            | Slow   | Real environment       | Verify complete user workflow |

### Unit Test

Kiểm thử các đơn vị mã nhỏ nhất, thường là các hàm hoặc phương thức riêng lẻ.

- **Mục đích**
  - Đảm bảo mỗi hàm chạy đúng như mong muốn, dễ phát hiện bug sớm.

- **Đặc điểm**
  - Chạy rất nhanh
  - Dễ debug vì phạm vi nhỏ
  - Là trọng tâm chính của TDD

### Integration Test

Kiểm tra nhiều hàm hoặc module khi chạy chung có hoạt động đúng không. Ví dụ service gọi repository để lưu vào file JSON, ở đây sẽ test cả quá trình đó.

- **Mục đích**:
  Đảm bảo các module phối hợp đúng, không bị sai dữ liệu khi truyền qua lại.

- **Đặc điểm**:
  - Chạy lâu hơn unit test nhưng nhanh hơn E2E
  - Thường phải tương tác với database hoặc file thật
  - Giúp phát hiện lỗi ở chỗ kết nối giữa các module

### E2E

Thực hiện lại quá trình giống người dùng thật, kiểm tra từ input output cuối cùng

- **Mục đích**:
  Test toàn bộ flow người dùng. Đảm bảo hệ thống hoạt động như mong đợi.

- **Đặc điểm**:
  - E2E thường chạy chậm vì phải đi qua gần như toàn bộ flow của ứng dụng.
  - Giống cách người dùng thật sử dụng
  - Kiểm tra toàn bộ flow hoạt động giống cách user sử dụng thật.

## 4. CLI Testing

**Khi phát triển một công cụ dòng lệnh (CLI tool), việc kiểm thử cần bao quát nhiều khía cạnh để đảm bảo tính toàn diện:**

**Kiểm thử lệnh** (Command Testing): Xác minh rằng mỗi lệnh (command) của CLI hoạt động đúng, nhận đúng đối số (arguments), và tùy chọn (options).

**Ví dụ trong todo cli:**

```cmd
node src/cli.js add "Todo title"
node src/cli.js list
node src/cli.js complete 1
node src/cli.js delete 1
```

**Cần test:**

- command tồn tại
- command chạy đúng
- invalid command

**Kiểm thử xác thực (Validation Testing):** Đảm bảo CLI xử lý đúng các đầu vào không hợp lệ, các trường hợp thiếu thông tin hoặc sai định dạng.

**Ví dụ:**

- title rỗng
- title là arr, obj

**Kiểm thử lưu trữ tệp/cơ sở dữ liệu (File/Database Storage Testing):** Nếu CLI tương tác với tệp tin hoặc cơ sở dữ liệu, cần kiểm tra việc đọc, ghi, cập nhật và xóa dữ liệu có chính xác và nhất quán hay không.

**Kiểm thử lỗi (Error Handling Testing):** Đảm bảo rằng CLI xử lý các tình huống lỗi một cách rõ ràng, hiển thị thông báo lỗi thân thiện và không bị crash.

**Kiểm thử đầu cuối (End-to-End Testing):** Tích hợp các kiểm thử trên để mô phỏng toàn bộ luồng sử dụng CLI

**Ví dụ:** tạo ticket, xem danh sách ticket, cập nhật ticket, đánh dấu hoàn thành.

## 5. AI Validation

**AI có thể sinh code nhanh, nhưng cần kiểm thử để xác nhận code đó đúng, an toàn, ổn định và đáp ứng yêu cầu.**

- **Xác minh tính đúng đắn**
  → dùng unit test/integration test để kiểm tra code AI sinh ra có chạy đúng không.
- **Cải thiện chất lượng**
  → test giúp phát hiện edge cases, bug logic, hallucination của AI.
- **Tài liệu hóa hành vi**
  → test mô tả expected behavior của code.
- **Đảm bảo ổn định khi thay đổi**
  → regression testing khi AI refactor hoặc generate phiên bản mới.

### Ví dụ thực tế từ Todo CLI

Trong quá trình xây dựng Todo CLI, AI đề xuất xử lý input như sau:

```js
if (typeof title !== "string" && typeof title !== "number") {
  throw new Error("Title must be a string or number");
}
if (!title?.toString().trim()) {
  throw new Error("Title is required");
}
```

Tuy nhiên khi review bằng unit test, tôi phát hiện:

- validation order chưa đúng
- `undefined` trả về sai error message

Sau khi review lại bằng unit test, tôi refine validation flow để xử lý:

- empty input
- invalid types

```js
if (!title?.toString().trim()) {
  throw new Error("Title is required");
}
if (typeof title !== "string" && typeof title !== "number") {
  throw new Error("Title must be a string or number");
}
```

Qua test tôi mới phát hiện validation flow chưa hợp lý. Vì vậy cần phải kiểm chứng, xác minh code mà AI tạo ra.

## 6. Các lỗi phổ biến trong kiểm thử và cách tránh

Dù áp dụng TDD hay bất kỳ phương pháp kiểm thử nào, có những sai lầm dễ mắc phải:

**Kiểm thử quá mức (Over-testing):** Viết quá nhiều test cho những phần mã không quan trọng hoặc quá chi tiết vào cách triển khai thay vì hành vi.

**Cách tránh:** Tập trung vào các kịch bản quan trọng và hành vi bên ngoài của chức năng.

**Đoạn mã**

```js
function completeTicket(ticket) {
  markAsCompleted(ticket);
}

function markAsCompleted(ticket) {
  ticket.completed = true;
}
```

**Ví dụ không tốt**

```js
expect(markAsCompleted).toHaveBeenCalled();
```

**Ví dụ nên làm:**

```js
expect(ticket.completed).toBe(true);
```

**Khẳng định (Assertions) yếu:** Sử dụng các điều kiện kiểm tra quá lỏng lẻo, cho phép nhiều kết quả khác nhau cùng được coi là "pass".

**Cách tránh:** Sử dụng các khẳng định cụ thể và chính xác, kiểm tra các giá trị, kiểu dữ liệu và trạng thái mong muốn.

**Ví dụ yếu**

```js
expect(ticket).toBeDefined();
```

Assertion này chỉ kiểm tra sự tồn tại của ticket, nhưng không xác minh dữ liệu hoặc trạng thái bên trong.

**Ví dụ tốt hơn**

```js
expect(ticket.completed).toBe(false);
```

Assertion này kiểm tra trực tiếp trạng thái mong muốn của ticket, giúp phát hiện lỗi chính xác và đáng tin cậy hơn.

**Kiểm thử chi tiết triển khai (Testing Implementation Details):** Viết test dựa trên cách một hàm được viết bên trong, thay vì kiểm tra kết quả mà nó mang lại. Điều này làm cho test dễ bị hỏng khi code được tái cấu trúc.

**Cách tránh:** Tập trung vào "cái gì" (what - hành vi) chứ không phải "như thế nào" (how - cách triển khai).

**Tin tưởng mù quáng vào AI (Blindly Trusting AI Output):** Chấp nhận code hoặc test do AI tạo ra mà không xem xét kỹ lưỡng hoặc chạy chúng.

**Cách tránh:** Luôn xem xét, xác thực và chạy thử nghiệm với code và test do AI tạo ra, coi chúng như một gợi ý chứ không phải là sự thật tuyệt đối.

## 7. Workflow Evidence

Trong quá trình xây dựng Todo CLI bằng TDD, tôi đã áp dụng cả 3 workflow với AI:

### 1. Layered Questioning

- Research về TDD, unit test, mock, behavior testing
- Hỏi về cách chia layer Service / Repository / CLI
- Làm rõ khác nhau giữa testing behavior và implementation details

### 2. Solution Exploration

Tôi đã explore nhiều lựa chọn:

- Mock repository hay lưu file thật
- Test interaction hay test output
- Validation ở service hay CLI
- Test nhỏ từng behavior hay test nhiều behavior cùng lúc

Sau khi compare ưu/nhược điểm, tôi chọn:

- Mock dependency trong unit test
- Ưu tiên test output và behavior thay vì internal function call.
- Tách service/repository responsibilities

### 3. Iterative Refinement

Tôi liên tục refine implementation dựa trên feedback:

- Sửa validation order
- Thống nhất createdAt naming
- Thêm trim behavior test
- Loại bỏ unnecessary mock setup
- Refactor test naming và responsibilities

Quá trình trao đổi chi tiết có thể xem tại đây để đối chiếu: [tại đây](https://chatgpt.com/share/6a05f88a-e5f0-83ec-8f82-3c53c2d15008)
