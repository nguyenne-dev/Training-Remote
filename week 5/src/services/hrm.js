import fs from "fs";
import path from "path";

export function findInfoByEmail(emailInput) {
  // Đường dẫn tới file crm_hr.json trong src/data
  const filePath = path.join(process.cwd(), "src", "data", "hr.json");

  // Đọc file
  const data = fs.readFileSync(filePath, "utf-8");
  const records = JSON.parse(data);

  // Tìm bản ghi theo email
  const record = records.find((item) => item.email === emailInput);

  if (record) {
    return record;
  } else {
    return null;
  }
}

export function updateInfoByEmail(emailInput, newData) {
  // Đọc file
  const data = fs.readFileSync(filePath, "utf-8");
  const records = JSON.parse(data);

  // Tìm index của bản ghi theo email
  const index = records.findIndex((item) => item.email === emailInput);

  if (index === -1) {
    return false; // Không tìm thấy
  }

  records[index] = {
    ...records[index],
    ...newData,
    email: records[index].email,
  };

  // Ghi lại file
  fs.writeFileSync(filePath, JSON.stringify(records, null, 2), "utf-8");

  return true;
}