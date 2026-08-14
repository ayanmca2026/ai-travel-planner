export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: {
    currency?: string;
    theme?: string;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}
