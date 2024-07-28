import { IExecutor } from '../executor.interface';

export interface IResponseCreateUser {
  id: string;
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
  password: string;
  verifiedToken: string;
  forgotPasswordToken: string;
  refreshToken: string;
  status: string;
}
