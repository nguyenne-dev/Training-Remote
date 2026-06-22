import { getTickets } from "../services/odoo-ticket.service.js";
import { getTags } from "../services/odoo-tag.service.js";
import { getMessages } from "../services/odoo-message.service.js";
import { classifyTicket } from "../utils/classify-ticket.js";
import { getLastUserMessage } from "../utils/message.util.js";
import { readTickets, saveTickets } from "../services/file.service.js";
import { findAccount, parseResetPassword } from "../utils/command.util.js";
import { composeEmail } from "../services/odoo_sentmail.js";
import { findInfoByEmail } from "../services/hrm.js";

export async function syncTickets() {
  try {
    console.log("Đang lấy dữ liệu...");

    const oldData = await readTickets();

    const tickets = await getTickets();
    const tags = await getTags();

    const tagMap = {};

    for (const tag of tags) {
      tagMap[tag.id] = tag.name.toLowerCase();
    }

    const result = [];

    // for (const ticket of tickets) {
    //   const type = classifyTicket(ticket, tagMap);

    //   const messages = await getMessages(ticket.message_ids || []);

    //   const lastMessage = getLastUserMessage(messages);

    //   const oldTicket = oldData.tickets.find((t) => t.id === ticket.id);

    //   if (
    //     oldTicket &&
    //     oldTicket.status === "DONE" &&
    //     oldTicket.lastMessage === lastMessage
    //   ) {
    //     console.log(`Bỏ qua ticket ${ticket.id}`);
    //     result.push(oldTicket);
    //     continue;
    //   }

    //   if (
    //     oldTicket &&
    //     oldTicket.status === "DONE" &&
    //     oldTicket.lastMessage !== lastMessage
    //   ) {
    //     console.log(`Ticket ${ticket.id} có phản hồi mới`);
    //   }

    //   const accountValue = findAccount(ticket, lastMessage);
    //   if (accountValue) {
    //     const data = await findInfoByEmail(accountValue);
    //     if (data) {
    //       if (data.trang_thai == "inactive") {
    //         await composeEmail(
    //           "Thông tin ticket",
    //           "Tài khoản của bạn đã không còn hoạt động, nếu có thắc mắc hãy tạo ticket yêu cầu mở khóa tài khoản.",
    //           ticket.partner_email,
    //           2,
    //           ticket.id,
    //         );
    //       } else if (data.trang_thai_lam_viec == "nghỉ") {
    //         await composeEmail(
    //           "Thông tin ticket",
    //           "Nhân viên đã nghỉ việc, nên tài khoản đã không thể sử dụng tiếp",
    //           ticket.partner_email,
    //           2,
    //           ticket.id,
    //         );
    //       } else if (
    //         data.trang_thai_tai_khoan == "khóa" &&
    //         (data.note === "dấu hiệu lạ" || data.note === "tài khoản vi phạm")
    //       ) {
    //         await composeEmail(
    //           "Thông tin ticket",
    //           "Tài khoản của bạn đã bị khóa, hãy liên hệ với hr để kiểm tra",
    //           ticket.partner_email,
    //           2,
    //           ticket.id,
    //         );
    //       } else {
    //         await composeEmail(
    //           "Reset tài khoản",
    //           `Chúng tôi đã gửi link reset tài khoản cho bạn. Vui lòng kiểm tra email đăng ký (${accountValue}).`,
    //           ticket.partner_email,
    //           2,
    //           ticket.id,
    //         );
    //         await composeEmail(
    //           "Reset tài khoản",
    //           "Chúng tôi đã gửi link reset tài khoản cho bạn. Vui lòng truy cập link để thay đổi mật khẩu.",
    //           data.email_dang_ky,
    //           2,
    //           ticket.id,
    //         );
    //       }
    //     } else {
    //       await composeEmail(
    //         "Reset tài khoản",
    //         "Chúng tôi không tìm thấy thông tin cho email, vui lòng kiểm tra lại email.",
    //         ticket.partner_email,
    //         2,
    //         ticket.id,
    //       );
    //     }
    //   } else {
    //     await composeEmail(
    //       "Yêu cầu thêm thông tin",
    //       "Vui lòng cung cấp tài khoản email gặp sự cố theo mẫu sau: RESET_PASSWORD: abc@gmail.com",
    //       ticket.partner_email,
    //       2,
    //       ticket.id,
    //     );
    //   }

    //   result.push({
    //     id: ticket.id,
    //     title: ticket.title,
    //     type,

    //     // status: accountValue ? "READY" : "WAITING_USER_INFO",
    //     status: "DONE",

    //     mode: type === "LOGIN" || type === "RESET_PASSWORD" ? "AUTO" : "MANUAL",

    //     partner_email: ticket.partner_email,

    //     accountValue,

    //     lastMessage,
    //   });
    // }

    for (const ticket of tickets) {
      const type = classifyTicket(ticket, tagMap);
      const messages = await getMessages(ticket.message_ids || []);
      const lastMessage = getLastUserMessage(messages);

      const oldTicket = oldData.tickets.find((t) => t.id === ticket.id);

      // Nếu ticket đã DONE và không có phản hồi mới bỏ qua
      if (
        oldTicket &&
        oldTicket.status === "DONE" &&
        oldTicket.lastMessage === lastMessage
      ) {
        console.log(`Bỏ qua ticket ${ticket.id}`);
        result.push(oldTicket);
        continue;
      }

      // Nếu ticket đã DONE nhưng có phản hồi mới thì xử lý lại
      if (
        oldTicket &&
        oldTicket.status === "DONE" &&
        oldTicket.lastMessage !== lastMessage
      ) {
        console.log(`Ticket ${ticket.id} có phản hồi mới, xử lý lại`);
      }

      const accountValue = findAccount(ticket, lastMessage);

      let status = "WAITING_USER_INFO";

      if (accountValue) {
        const data = await findInfoByEmail(accountValue);
        if (data) {
          if (data.trang_thai === "inactive") {
            await composeEmail({
              subject: "Thông tin ticket",
              body: "Tài khoản của bạn đã không còn hoạt động, nếu có thắc mắc hãy tạo ticket yêu cầu mở khóa tài khoản.",
              email_to: ticket.partner_email,
              author_id: 2,
              res_id: ticket.id,
            });
          } else if (data.trang_thai_lam_viec === "nghỉ") {
            await composeEmail({
              subject: "Thông tin ticket",
              body: "Nhân viên đã nghỉ việc, nên tài khoản đã không thể sử dụng tiếp.",
              email_to: ticket.partner_email,
              author_id: 2,
              res_id: ticket.id,
            });
          } else if (
            data.trang_thai_tai_khoan === "khóa" &&
            (data.note === "dấu hiệu lạ" || data.note === "tài khoản vi phạm")
          ) {
            await composeEmail({
              subject: "Thông tin ticket",
              body: "Tài khoản của bạn đã bị khóa, hãy liên hệ với HR để kiểm tra.",
              email_to: ticket.partner_email,
              author_id: 2,
              res_id: ticket.id,
            });
          } else {
            await composeEmail({
              subject: "Reset tài khoản",
              body: `Chúng tôi đã gửi link reset tài khoản cho bạn. Vui lòng kiểm tra email đăng ký (${accountValue}).`,
              email_to: ticket.partner_email,
              author_id: 2,
              res_id: ticket.id,
            });
            await composeEmail({
              subject: "Reset tài khoản",
              body: "Chúng tôi đã gửi link reset tài khoản cho bạn. Vui lòng truy cập link để thay đổi mật khẩu.",
              email_to: data.email_dang_ky,
              author_id: 2,
              res_id: ticket.id,
            });
          }
          status = "DONE"; // sau khi xử lý xong thì set DONE
        } else {
          await composeEmail({
            subject: "Reset tài khoản",
            body: "Chúng tôi không tìm thấy thông tin cho email, vui lòng kiểm tra lại email, nếu sai hãy gửi lại email theo mẫu sau: RESET_PASSWORD: abc@gmail.com.",
            email_to: ticket.partner_email,
            author_id: 2,
            res_id: ticket.id,
          });
          status = "DONE";
        }
      } else {
        await composeEmail({
          subject: "Yêu cầu thêm thông tin",
          body: "Vui lòng cung cấp tài khoản email gặp sự cố theo mẫu sau: RESET_PASSWORD: abc@gmail.com",
          email_to: ticket.partner_email,
          author_id: 2,
          res_id: ticket.id,
        });
        status = "WAITING_USER_INFO";
      }

      result.push({
        id: ticket.id,
        title: ticket.title,
        type,
        status,
        mode: type === "LOGIN" || type === "RESET_PASSWORD" ? "AUTO" : "MANUAL",
        partner_email: ticket.partner_email,
        accountValue,
        lastMessage,
      });
    }

    await saveTickets(result);

    console.log("Đã cập nhật data.json");
  } catch (error) {
    console.error(error);
  }
}
