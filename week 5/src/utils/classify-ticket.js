export function classifyTicket(ticket, tagMap) {
  const content = `
    ${ticket.name || ""}
    ${ticket.description || ""}
  `.toLowerCase();

  const tags = (ticket.tag_ids || [])
    .map(id => tagMap[id])
    .filter(Boolean);

  if (tags.includes("incident")) {
    return "INCIDENT";
  }

  if (tags.includes("feature")) {
    return "FEATURE_REQUEST";
  }

  if (tags.includes("password")) {
    return "ACCESS_REQUEST";
  }

  if (tags.includes("login")) {
    return "LOGIN";
  }

  if (
    content.includes("đăng nhập") ||
    content.includes("login")
  ) {
    return "LOGIN";
  }

  if (
    content.includes("mật khẩu") ||
    content.includes("password")
  ) {
    return "RESET_PASSWORD";
  }

  return "UNKNOWN";
}