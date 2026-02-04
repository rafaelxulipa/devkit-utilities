
interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const CHARSETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

export const generatePassword = (options: PasswordOptions): string => {
  const { length, includeUppercase, includeNumbers, includeSymbols } = options;
  
  let charset = CHARSETS.lowercase;
  if (includeUppercase) charset += CHARSETS.uppercase;
  if (includeNumbers) charset += CHARSETS.numbers;
  if (includeSymbols) charset += CHARSETS.symbols;

  if (!charset) return '';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};
