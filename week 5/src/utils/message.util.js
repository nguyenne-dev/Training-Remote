export function getLastUserMessage(messages) {
  const supportAuthorId = 3;

  const userMessage = messages.find(
    message =>
      (message.message_type === "email"||message.message_type === "comment") &&
      message.author_id?.[0] !== supportAuthorId
  );

  if (!userMessage) {
    return "";
  }

  let text = userMessage.preview;
  const email = userMessage.email_from || "";

  // Cắt phần quote email
  const quoteMarkers = [
    "Vào Thứ",
    "On ",
    "From:",
    "-----Original Message-----"
  ];

  for (const marker of quoteMarkers) {
    const index = text.indexOf(marker);

    if (index !== -1) {
      text = text.substring(0, index).trim();
    }
  }

  return text;
}