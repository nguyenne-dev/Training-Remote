# Week 5 - Helpdesk Ticket Automation

# Report 
[REPORT.md](./Report/REPORT.md)
---

## Giới thiệu

Dự án mô phỏng hệ thống tự động xử lý ticket Helpdesk từ Odoo.

Hệ thống sẽ định kỳ lấy các ticket đang mở, phân tích nội dung, tìm thông tin tài khoản người dùng, kiểm tra trạng thái nhân viên trong hệ thống HR và tự động gửi phản hồi phù hợp.

Mục tiêu chính là giảm thao tác thủ công của nhân viên hỗ trợ và chuẩn hóa quy trình xử lý các yêu cầu liên quan đến tài khoản.

---

## Chức năng chính

### 1. Đồng bộ ticket từ Odoo

* Lấy danh sách ticket từ Helpdesk.
* Chỉ xử lý các ticket đang ở trạng thái mở hoặc đang xử lý.

### 2. Phân loại ticket

Hệ thống tự động phân loại dựa trên:

* Tag của ticket.
* Tiêu đề.
* Nội dung mô tả.

Các loại hiện hỗ trợ:

* LOGIN
* RESET_PASSWORD
* ACCESS_REQUEST
* INCIDENT
* FEATURE_REQUEST
* UNKNOWN

### 3. Đọc nội dung trao đổi

* Lấy lịch sử hội thoại của ticket.
* Tìm nội dung do người dùng gửi.
* Loại bỏ phần email quote để chỉ giữ nội dung mới nhất.

### 4. Trích xuất tài khoản

Hỗ trợ cú pháp:

```text
RESET_PASSWORD: user@example.com
```

Ví dụ:

```text
RESET_PASSWORD: nguyenvana@gmail.com
```

### 5. Kiểm tra thông tin nhân viên

Tra cứu dữ liệu từ:

```text
src/data/crm_hr.json
```

Kiểm tra:

* Nhân viên còn làm việc hay không.
* Tài khoản còn hoạt động hay không.
* Tài khoản có bị khóa hay không.

### 6. Tự động phản hồi

Các trường hợp hỗ trợ:

#### Không cung cấp email

Gửi yêu cầu bổ sung thông tin.

#### Không tìm thấy tài khoản

Thông báo không tồn tại tài khoản.

#### Nhân viên nghỉ việc

Thông báo tài khoản không còn sử dụng.

#### Tài khoản bị khóa

Thông báo liên hệ HR.

#### Tài khoản hợp lệ

Gửi email hướng dẫn đặt lại mật khẩu.

### 7. Lưu kết quả xử lý

Kết quả được lưu vào:

```text
src/data/data.json
```

Bao gồm:

* Ticket ID
* Tiêu đề
* Loại ticket
* Trạng thái xử lý
* Thời gian cập nhật

---

## Cấu trúc thư mục

```text
src/
│
├── config/
│   └── env.js
│
├── data/
│   ├── crm_hr.json
│   └── data.json
│
├── jobs/
│   └── sync-tickets.job.js
│
├── services/
│   ├── hrm.js
│   ├── file.service.js
│   ├── odoo-message.service.js
│   ├── odoo-stage.service.js
│   ├── odoo-tag.service.js
│   ├── odoo-ticket.service.js
│   └── odoo_sentmail.js
│
├── utils/
│   ├── classify-ticket.js
│   ├── command.util.js
│   └── message.util.js
│
└── index.js
```

---

## Cài đặt

### 1. Clone source

```bash
git clone <repository>
cd project
```

### 2. Cài dependency

```bash
npm install
```

### 3. Tạo file môi trường

```bash
cp .env.example .env
```

Cấu hình:

```env
ODOO_URL=
ODOO_API_KEY=
```

### 4. Chạy chương trình

```bash
npm start
```

---

## Luồng xử lý

```text
Odoo Ticket
      ↓
Đồng bộ ticket
      ↓
Phân loại yêu cầu
      ↓
Phân tích nội dung ticket
      ↓
Trích xuất thông tin người dùng
      ↓
Tra cứu HR Database
      ↓
Xác định phương án xử lý
      ↓
Phản hồi khách hàng
      ↓
Lưu kết quả xử lý
---

## Công nghệ sử dụng

* Node.js

---

## Mục tiêu đào tạo

Dự án được xây dựng phục vụ bài tập Week 5 nhằm thực hành:

* Làm việc với API Odoo
* Tự động hóa quy trình Helpdesk
* Xử lý dữ liệu ticket
