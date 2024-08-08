export interface PasswordOptions {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }
  
export type PasswordCharset = Record<keyof PasswordOptions, string>;