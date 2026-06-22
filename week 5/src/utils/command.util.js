export function parseResetPassword(text) {
  if (!text) {
    return null;
  }

  const match = text.match(
    /RESET_PASSWORD\s*:\s*([^\n\r]+)/i
  );

  if (!match) {
    return null;
  }

  return match[1].trim();
}

export function findAccount(ticket, lastMessage) {
  const sources = [
    lastMessage,
    ticket.description,
    ticket.name,
  ];

  for (const text of sources) {
    const account = parseResetPassword(text);

    if (account) {
      return account;
    }
  }

  return null;
}