# Week 1

## 1. TDD là gì?

### Định nghĩa

Test-Driven Development (TDD) là phương pháp phát triển phần mềm trong đó test được viết trước khi thực hiện code feature

### Mục tiêu của TDD:

- Tăng độ ổn định của phần mềm
- Giảm bug sớm
- Thiết kế architecture tốt hơn
- Kiểm soát chất lượng code do AI generate
- Validate behavior liên tục

## 2. Red Green Refactor

### Red:

Viết test trước khi lập trình tính năng, khi này test sẽ fail

- **Mục đích**
  - Xác định behavior mong muốn
  - Chứng minh behavior chưa tồn tại
  - Làm rõ requirement trước khi code

- **Ví dụ**:

```js
const { createTicket } = require("../src/ticket.service");
test("create_01", () => {
  const ticket = createTicket("Learn TDD");
  expect(ticket.title).toBe("Learn TDD");
});
```

- Kết quả mong muốn: FAIL

### Green

Viết minimal implementation để có thể test pass

- **Ví dụ**:

```js
exports.createTicket = (title) => {
  return {
    title,
    completed: false,
  };
};
```

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

### Unit Test

Kiểm thử các đơn vị mã nhỏ nhất, thường là các hàm hoặc phương thức riêng lẻ.

- **Mục đích**
  - Cô lập và kiểm tra từng phần nhỏ của code, đảm bảo chúng hoạt động chính xác như mong đợi. TDD tập trung chủ yếu vào cấp độ này.

- **Đặc điểm**
  - Nhanh
  - Dễ debug
  - Phạm vi nhỏ
  - Là trọng tâm chính của TDDX

### Integration Test

Kiểm thử sự tương tác giữa các đơn vị mã khác nhau hoặc giữa các module. Chúng đảm bảo rằng các thành phần khi kết hợp với nhau vẫn hoạt động đúng

- **Mục đích**:
  Test nhiều module hoạt động cùng nhau.

- **Đặc điểm**:
  - Tốc độ trung bình
  - Có interaction với storage/database
  - Kiểm tra module connect đúng không

### E2E

Mô phỏng quá trình đầy đủ của người dùng từ đầu đến cuối trong hệ thống.

- **Mục đích**:
  Test toàn bộ flow người dùng.

- **Đặc điểm**:
  - Chậm nhất
  - Mô phỏng usage thật
  - Verify toàn bộ hệ thống

## 4. CLI Testing

**Khi phát triển một công cụ dòng lệnh (CLI tool), việc kiểm thử cần bao quát nhiều khía cạnh để đảm bảo tính toàn diện:**

**Kiểm thử lệnh** (Command Testing): Xác minh rằng mỗi lệnh (command) của CLI hoạt động đúng, nhận đúng đối số (arguments), và tùy chọn (options).

**Ví dụ:**

```cmd
node app.js add "CMD Create"
node app.js list
node app.js complete 1
```

**Cần test:**

- command tồn tại
- command chạy đúng
- invalid command

**Kiểm thử xác thực (Validation Testing):** Đảm bảo CLI xử lý đúng các đầu vào không hợp lệ, các trường hợp thiếu thông tin hoặc sai định dạng.

**Ví dụ:**

- title rỗng
- id không hợp lệ
- duplicate

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

### 6. Các lỗi phổ biến trong kiểm thử và cách tránh

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