# Báo cáo phân tích Ticket

## Mục tiêu

Mục tiêu của báo cáo là phân tích tập dữ liệu ticket hỗ trợ kỹ thuật nhằm:

- Xác định các nhóm vấn đề phổ biến.
- Đánh giá mức độ ưu tiên của ticket.
- Phân tích trạng thái xử lý.
- Đề xuất hướng cải thiện quy trình hỗ trợ.

---

## Tổng quan dữ liệu

- Tổng số ticket: **131**
- Nguồn dữ liệu: **Sample Dataset**
- Lĩnh vực: **Technical Support**

---

## Kết quả phân tích

### 1. Nhóm "Other" chiếm tỷ lệ lớn

Có tới **61.83%** ticket chưa được phân loại vào nhóm nghiệp vụ cụ thể.

Điều này cho thấy:

- Bộ quy tắc phân loại hiện tại còn hạn chế.
- Nội dung ticket khá đa dạng.
- Cần bổ sung thêm từ khóa để tăng độ chính xác.

---

### 2. Enrollment là nhóm phổ biến nhất

Sau nhóm Other, các ticket liên quan đến **Enrollment** xuất hiện nhiều nhất.

Các vấn đề thường gặp gồm:

- Enroll học viên.
- Không tìm thấy lớp.
- Không thêm được học viên.
- Lỗi đăng ký lớp.

Đây là nhóm có quy trình khá rõ ràng và phù hợp để tự động hóa.

---

### 3. Các vấn đề về tài khoản và Email

Hai nhóm:

- Account Access
- Email

xuất hiện với tần suất khá cao.

Phần lớn là các lỗi:

- Quên mật khẩu.
- Không đăng nhập được.
- Khóa tài khoản.
- Thiếu email.
- Không nhận được email.

Đây đều là những vấn đề có thể giảm đáng kể nếu có tài liệu hướng dẫn hoặc quy trình tự động.

---

### 4. Mức độ ưu tiên

**High Priority** là mức ưu tiên xuất hiện nhiều nhất.

Điều này cho thấy phần lớn ticket ảnh hưởng trực tiếp đến hoạt động của người dùng.

---

### 5. Trạng thái ticket

Toàn bộ ticket trong bộ dữ liệu đều ở trạng thái **In Progress**.

Có thể do dữ liệu được xuất tại thời điểm các ticket vẫn đang được xử lý.

---

## Đề xuất cải thiện

### Cải thiện phân loại

- Mở rộng bộ từ khóa để giảm số lượng ticket thuộc nhóm **Other**.
- Có thể áp dụng NLP nếu dữ liệu lớn hơn trong tương lai.

### Xây dựng Knowledge Base

Ưu tiên xây dựng tài liệu hướng dẫn cho:

- Reset Password.
- Enrollment.
- Email.
- CRM.

Điều này giúp giảm số lượng ticket lặp lại.

### Tự động hóa quy trình

Các nhóm như **Enrollment**, **Account Access** và **Email** đều có quy trình xử lý lặp lại nên phù hợp để tự động hóa.

Trong phạm vi project, mình đã xây dựng chức năng **Reset Password** trên hệ thống Odoo.

Quy trình hoạt động gồm:

1. Kiểm tra tài khoản người dùng có tồn tại hay không.
2. Kiểm tra trạng thái của tài khoản (đang hoạt động hay không).
3. Chỉ thực hiện đặt lại mật khẩu khi tài khoản hợp lệ.
4. Trả về thông báo tương ứng nếu tài khoản không tồn tại hoặc không đủ điều kiện để reset.

Chức năng này giúp:

- Giảm thao tác thủ công cho nhân viên hỗ trợ.
- Hạn chế việc reset nhầm cho tài khoản không hợp lệ.
- Rút ngắn thời gian xử lý các yêu cầu quên mật khẩu.
- Đảm bảo quy trình xử lý thống nhất và chính xác.

Trong tương lai có thể mở rộng automation cho các nhóm ticket phổ biến khác như Enrollment hoặc Email.

---

## Kết luận

Qua 131 ticket, có thể thấy phần lớn yêu cầu hỗ trợ tập trung vào một số nhóm nghiệp vụ lặp lại, đặc biệt là **Enrollment**, **Account Access** và **Email**.

Bên cạnh việc phân tích dữ liệu, project cũng triển khai thành công chức năng **Reset Password** trên Odoo nhằm tự động hóa một quy trình xử lý thường gặp. Điều này giúp giảm thời gian xử lý và nâng cao hiệu quả hỗ trợ người dùng.

Trong tương lai, việc mở rộng bộ quy tắc phân loại kết hợp với triển khai thêm các quy trình tự động sẽ góp phần tối ưu hóa hoạt động của bộ phận hỗ trợ.