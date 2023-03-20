export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AccessTokenResponse {
  access_token: string;
}

export interface OrgTokenResponse {
  data: any;
}

export interface invoiceParams {
  page: number;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export type LoginResponse = AccessTokenResponse & OrgTokenResponse;
