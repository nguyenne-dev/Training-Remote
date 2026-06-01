# Week 3 - CLI tích hợp Knowledge Base API

## Giới thiệu

Project Week 3 mở rộng CLI từ Week 2 bằng cách tích hợp với hệ thống Knowledge Base (KB).

CLI có thể:

* Quản lý ticket
* Tìm kiếm tài liệu KB
* Liệt kê tài liệu theo node
* Lấy chi tiết tài liệu
* Thêm tài liệu mới

Project hỗ trợ 2 chế độ:

* **Mock KB Client**: dữ liệu local để test
* **HTTP KB Client**: gọi API thật thông qua HTTP

---

## Công nghệ sử dụng

* Node.js
* Jest
* dotenv
* fetch API

---

## Cấu trúc thư mục

```txt
src/
├── cli.js
├── clients/
│   ├── mock-kb.client.js
│   └── http-kb.client.js
├── services/
│   ├── kb.service.js
│   └── ticket.service.js
├── repositories/
└── storage/

tests/
├── unit/
├── integration/
└── e2e/

kb_local/
```

---

## Cài đặt

### 1. Cài package

```bash
npm install
```

### 2. Cấu hình môi trường

Tạo file `.env`

Ví dụ:

```env
KB_CLIENT=mock
KB_URL=http://localhost:3000
```

Trong đó:

* `mock`: dùng dữ liệu local
* `http`: gọi API thật

---

## Chạy local KB API

Di chuyển vào thư mục:

```bash
cd kb_local
```

Cài package:

```bash
npm install
```

Khởi động server:

```bash
node index.js
```

Server mặc định:

```txt
http://localhost:3000
```

---

## Sử dụng CLI

### Ticket commands

Thêm ticket

```bash
node src/cli.js add "Fix login bug"
```

Danh sách ticket

```bash
node src/cli.js list
```

Hoàn thành ticket

```bash
node src/cli.js complete 1
```

Xóa ticket

```bash
node src/cli.js delete 1
```

---

### KB commands

Tìm kiếm tài liệu

```bash
node src/cli.js kb search template
```

Liệt kê theo node path

```bash
node src/cli.js kb list /templates/email
```

Lấy document theo id

```bash
node src/cli.js kb retrieve doc-001
```

Thêm document

```bash
node src/cli.js kb add "Title" "Content" "/docs" "tag1,tag2"
```

---

## Chạy test

Chạy toàn bộ test:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

---

## Kiến trúc hệ thống

```txt
CLI
 │
 ▼
KB Service
 │
 ├── Mock KB Client
 │
 └── HTTP KB Client
        │
        ▼
      KB API
```

Project sử dụng environment variable để chuyển đổi giữa mock client và HTTP client.

---

## Mục tiêu học được

* Tích hợp HTTP API vào CLI
* Thiết kế mock-first development
* Viết unit, integration, e2e tests
* Tách service và client
* Sử dụng environment variable để switch implementation
