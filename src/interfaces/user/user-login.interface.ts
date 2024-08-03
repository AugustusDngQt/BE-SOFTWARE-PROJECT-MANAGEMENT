export interface IUserLogin {
  id: string;
  email: string;
  phoneNumber: string;
  name: string;
  accessToken?: string;
  refreshToken?: string;
}
