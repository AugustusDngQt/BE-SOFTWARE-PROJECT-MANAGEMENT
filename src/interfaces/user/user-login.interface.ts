export interface IUserLogin {
  id: string;
  email: string;
  phoneNumber: string;
  name: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
}
