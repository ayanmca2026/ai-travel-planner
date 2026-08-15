export interface User {
  id: string | number;
  email: string;
  full_name?: string;
  name?: string; // Fallback for existing components
  avatar_url?: string;
  avatar?: string;
  is_admin?: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}
