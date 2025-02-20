export function generateTransRef(): string {
  const generateCode = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const timestamp = Date.now().toString(36).toUpperCase();
  const initials = "HOPM";
  const randomCode = generateCode();

  return `${initials}-${timestamp}-${randomCode}`;
}
